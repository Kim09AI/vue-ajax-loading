export const isObject = (obj) => Object.prototype.toString.call(obj) === '[object Object]'

export const isArray = (arr) => Array.isArray(arr)

export function checkUnique(target, obj) {
    Object.keys(obj).forEach(key => {
        if (key in target) {
            console.warn(`存在重复键值 ${key} 后面的会把前面的覆盖`)
        }
    })
}
