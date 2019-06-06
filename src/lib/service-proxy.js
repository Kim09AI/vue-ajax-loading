import { isObject } from './utils'

/**
 * 代理请求的方法并自动往 store 设置全局的 loading
 * @param {object} obj 要代理的对象
 * @param {object} store Vuex.Store 创建的实例
 * @param {string} module 模块命名空间
 */
function serviceProxy(obj, store, module = '') {
    const childProxy = {}

    Object.keys(obj).forEach(prop => {
        if (isObject(obj[prop])) {
            // 递归代理嵌套对象
            childProxy[prop] = serviceProxy(obj[prop], store, prop)
        }
    })

    return new Proxy(obj, {
        get(target, prop) {
            if (isObject(target[prop])) {
                return childProxy[prop]
            }

            if (typeof target[prop] !== 'function') {
                return target[prop]
            }

            // 通过代理函数自动设置点前请求的 loading 状态
            const proxyFunc = function(...args) {
                return new Promise(async (resolve, reject) => {
                    store.commit('@@loading/SET_LOADING_STATUS', {
                        module,
                        prop,
                        status: true
                    })
    
                    let result
                    let hasError = false
                    try {
                        result = await target[prop](...args)
                    } catch (err) {
                        result = err
                        hasError = true
                    }
    
                    store.commit('@@loading/SET_LOADING_STATUS', {
                        module,
                        prop,
                        status: false
                    })
    
                    hasError ? reject(result) : resolve(result)
                })
            }

            return proxyFunc
        }
    })
}

export default serviceProxy