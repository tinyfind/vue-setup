/*
 * @Author: dong 2710732812@qq.com
 * @Date: 2023-03-06 16:25:09
 * @LastEditors: dong 2710732812@qq.com
 * @LastEditTime: 2023-03-07 14:05:20
 * @FilePath: \develop_web\src\hooks\core.js
 * @Description: hook core
 */

import { getSetupParams, $on, $once, $watch, $nextTick, observe, isReactive, isRef, getWatchTarget, REFTYPE } from "./helpers"


// 当前实例
let instance = null

export function getCurrentInstance() {
    return instance
}

function observerSetup(setupState, instance) {

    Reflect.defineProperty(instance, "setupState", { value: setupState })

    Object.keys(setupState).forEach((key) => {
        Reflect.defineProperty(instance, key, {
            get() {
                const value = Reflect.get(setupState, key)
                if (isRef(value)) {
                    return Reflect.get(value, "value")
                }
                return value
            },
            set(value) {
                if (isRef(setupState[key])) {
                    Reflect.set(setupState[key], "value", value)
                } else {
                    Reflect.set(setupState, key, value)
                }
                return value
            }
        })
        if (isRef(setupState[key])) {
            const refValue = setupState[key]
            Reflect.defineProperty(instance, key, {
                get() {
                    return refValue.value
                },
                set(value) {
                    refValue.value = value
                    return value
                }
            })
        } else if (isReactive(setupState[key])) {
            instance[key] = setupState[key]
        } else {
            instance[key] = setupState[key]
        }
    })
}

// 待优化，在其他生命周期内也可调用 hook
export function defineComponent(option) {
    // 针对响应式数据 绑定至 data
    if (typeof option.setup !== "function") return option;
    const mixinComponent = {
        created() {
            instance = this
            try {
                const setupState = option.setup.call(undefined, ...getSetupParams(instance))

                if (typeof setupState === "function") {
                    return (instance.$options.render = setupState)
                } else if (typeof setupState === "object") {

                }
                observerSetup(setupState, instance)
                // 不需要放在$data中

            } finally {
                instance = null
                delete option.setup
            }
        }
    };
    (option.mixins = option.mixins || []).unshift(mixinComponent)
    return option
}

// 初始入口
// 在setup this 并不会指向实例，所以需要

export function nextTick(...args) {
    return $nextTick.call(instance, ...args)
};

// 还不支持数组形式
export function watch(target, effectFun, option) {
    const [watchTarget, mergeOption] = getWatchTarget(target, option)
    let clearEffect = new Function()
    const onCleanup = (clear) => {
        clearEffect = clear
    }
    const wrapEffectFun = (value, oldValue) => {
        clearEffect()
        effectFun?.(value, oldValue, onCleanup)
    }
    return $watch.call(instance, watchTarget, wrapEffectFun, mergeOption)
}

export function watchEffect(effectFun) {

    let clearEffect = new Function()
    const onCleanup = (clear) => {
        clearEffect = clear
    }
    const wrapEffectFun = () => {
        clearEffect()
        effectFun?.(onCleanup)
    }
    return $watch.call(instance, wrapEffectFun, new Function(), { immediate: true })
}

export function onBeforeMount(...args) {
    return $once.call(instance, "hook:beforeMount", ...args)
}

export function onMounted(...args) {
    return $once.call(instance, "hook:mounted", ...args)

}

export function onBeforeUpdate(...args) {
    return $on.call(instance, "hook:beforeUpdate", ...args)
}

export function onUpdated(...args) {
    return $on.call(instance, "hook:updated", ...args)
}

export function onBeforeUnmount(...args) {
    return $once.call(instance, "hook:beforeDestroy", ...args)
}

export function onUnmounted(...args) {
    return $once.call(instance, "hook:destroyed", ...args)
}

export function onActivated() {
    return $on.call(instance, "hook:activated", ...args)
}

export function onDeactivated() {
    return $on.call(instance, "hook:deactivated", ...args)
}

export function onErrorCaptured() {
    return $on.call(instance, "hook:errorCaptured", ...args)
}

export function ref(value) {
    return Object.seal(observe({
        value,
        get type() {
            return REFTYPE
        }
    }))
}

// (callback)
// ({get,set})
// 缓存
export function computed(option) {

    let get, set, cacheValue;
    let update = false;
    if (typeof option === "object") {
        get = option.get
        set = option.set
    } else if (typeof option === "function") {
        get = option
    }

    const computeRef = ref(cacheValue)

    watch(get, (value, oldValue) => {
        computeRef.value = value
    }, { immediate: true })

    watch(computeRef, (value) => {
        console.log(value)
        set && set(value)
    })

    return computeRef
}

export function reactive(obj) {
    return observe(obj)
}
