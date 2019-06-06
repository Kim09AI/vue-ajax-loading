import Vue from 'vue'
import { isArray, isObject, checkUnique } from './utils'
import serviceProxy from './service-proxy'

function getFinallyService({ global, modules }) {
    const finallyService = {}

    if (isArray(global) || isObject(global)) {
        global = isArray(global) ? global : [global]

        global.forEach(obj => {
            checkUnique(finallyService, obj)
            for (let prop in obj) {
                finallyService[prop] = obj[prop]
            }
        })
    }

    if (isObject(modules) && Object.keys(modules).length > 0) {
        checkUnique(finallyService, modules)

        for (let [namespace, value] of Object.entries(modules)) {
            !isObject(finallyService[namespace]) && (finallyService[namespace] = {})

            const _module = finallyService[namespace]
            for (let [prop, func] of Object.entries(value)) {
                _module[prop] = func
            }
        }
    }

    return finallyService
}

/**
 * 得到 loading 的初始状态
 * @param {object} finallyService 处理过后的 service 对象
 */
function getLoadingState(finallyService) {
    const loadingState = {}

    for (let [prop, val] of Object.entries(finallyService)) {
        if (typeof val === 'function') {
            loadingState[prop] = false
        } else {
            const moduleLoading = loadingState[prop] = {}
            Object.keys(val).forEach(key => moduleLoading[key] = false)
        }
    }

    return loadingState
}

export function ajaxLoading({ store, service, loading = '$loading' } = {}) {
    const finallyService = getFinallyService(service)
    const loadingState = getLoadingState(finallyService)

    // 初始化 loading 的状态
    store.commit('@@loading/INITIAL_LOADING', loadingState)
    
    if (typeof Vue.prototype[loading] !== 'undefined') {
        console.warn(`Vue原型上已存在 Vue.prototype.${loading}`)
    }

    Vue.prototype[loading] = store.state.loading

    return serviceProxy(finallyService, store)
}

export const loadingState = {
    loading: {}
}

export const loadingMutations = {
    ['@@loading/INITIAL_LOADING'](state, loading) {
        state.loading = loading
    },
    ['@@loading/SET_LOADING_STATUS'](state, { module, prop, status = false } = {}) {
        !!module
            ? state.loading[module][prop] = status
            : state.loading[prop] = status
    }
}
