/*
 * @Author: dong 2710732812@qq.com
 * @Date: 2023-03-06 16:25:09
 * @LastEditors: dong 2710732812@qq.com
 * @LastEditTime: 2023-03-07 14:05:20
 * @FilePath: \develop_web\src\hooks\core.js
 * @Description: hook core
 */

import {
  getSetupParams,
  $on,
  $once,
  $watch,
  $nextTick,
  observe,
  isReactive,
  isRef,
  getWatchTarget,
  REFTYPE,
  warn,
  isFunction
} from "./helpers";

import type { WatchOptions, ComponentOptions, CreateElement, VNode} from "vue";
import type { Vue} from "vue/types/vue";

class Current {
  #instance = null;
  get instance() {
      if (!this.#instance) {
          return warn("hooks must used in setup")
      }
      return this.#instance
  }
  set instance(instance) {
      this.#instance = instance
  }
}

// 当前实例
let current:Current = new Current()

export function getCurrentInstance():Vue {
  return current.instance;
}

function observerSetup(setupState, instance) {
  Reflect.defineProperty(instance, "setupState", { value: setupState });

  Object.keys(setupState).forEach((key) => {
    Reflect.defineProperty(instance, key, {
      get() {
        const value = Reflect.get(setupState, key);
        if (isRef(value)) {
          return Reflect.get(value, "value");
        }
        return value;
      },
      set(value) {
        if (isRef(setupState[key])) {
          Reflect.set(setupState[key], "value", value);
        } else {
          Reflect.set(setupState, key, value);
        }
        return value;
      },
    });
    if (isRef(setupState[key])) {
      const refValue = setupState[key];
      Reflect.defineProperty(instance, key, {
        get() {
          return refValue.value;
        },
        set(value) {
          refValue.value = value;
          return value;
        },
      });
    } else if (isReactive(setupState[key])) {
      instance[key] = setupState[key];
    } else {
      instance[key] = setupState[key];
    }
  });
}

// 待优化，在其他生命周期内也可调用 hook

type Props = Record<string, any>;
type Context = {
    attrs?:Record<string, any>,
    emits?:Function,
    slots?:Function
    // expose
}
type Render = (CreateElement:CreateElement)=>VNode
type Setup = (props:Props,context:Context)=>Object|Render
type DefineComponentOptions = ComponentOptions<Vue>&{setup?:Setup}
export function defineComponent(option:DefineComponentOptions) {
  // 针对响应式数据 绑定至 data
  if (typeof option.setup !== "function") return option;
  const mixinComponent = {
    created() {
      current.instance = this;
      try {
        const setupState = option.setup.call(
          undefined,
          ...getSetupParams(this)
        );

        if (typeof setupState === "function") {
          return (this.$options.render = setupState);
        } else if (typeof setupState === "object") {
        }
        observerSetup(setupState, this);
        // 不需要放在$data中
      } finally {
        current.instance = null;
        delete option.setup;
      }
    },
  };
  (option.mixins = option.mixins || []).unshift(mixinComponent);
  return option;
}

// 初始入口
// 在setup this 并不会指向实例，所以需要
export function nextTick(callback?: Function):Promise<void> {
  return $nextTick.call(current.instance, callback);
}

// 还不支持数组形式
type EffectFunWatch = (
  value: any,
  oldValue: any,
  onCleanup: (clean?: Function) => void
) => void;
export function watch(
  target: object | Function,
  effectFun?: EffectFunWatch,
  option?: WatchOptions
) {
  const [watchTarget, mergeOption] = getWatchTarget(target, option);
  let clearEffect = new Function();
  const onCleanup = (clear) => {
    clearEffect = clear;
  };
  const wrapEffectFun = (value, oldValue) => {
    clearEffect();
    effectFun?.(value, oldValue, onCleanup);
  };
  return $watch.call(current.instance, watchTarget, wrapEffectFun, mergeOption);
}

type EffectFunWatchEffect = (onCleanup: (clean?: Function) => void) => void;
export function watchEffect(effectFun: EffectFunWatchEffect): Function {
  let clearEffect = new Function();
  const onCleanup = (clear) => {
    clearEffect = clear;
  };
  const wrapEffectFun = () => {
    clearEffect();
    effectFun?.(onCleanup);
  };
  return $watch.call(current.instance, wrapEffectFun, new Function(), {
    immediate: true,
  });
}

export function onBeforeMount(callback: Function) {
  return $once.call(current.instance, "hook:beforeMount", callback);
}

export function onMounted(callback: Function) {
  return $once.call(current.instance, "hook:mounted", callback);
}

export function onBeforeUpdate(callback: Function) {
  return $on.call(current.instance, "hook:beforeUpdate", callback);
}

export function onUpdated(callback: Function) {
  return $on.call(current.instance, "hook:updated", callback);
}

export function onBeforeUnmount(callback: Function) {
  return $once.call(current.instance, "hook:beforeDestroy", callback);
}

export function onUnmounted(callback: Function) {
  return $once.call(current.instance, "hook:destroyed", callback);
}

export function onActivated(callback: Function) {
  return $on.call(current.instance, "hook:activated", callback);
}

export function onDeactivated(callback: Function) {
  return $on.call(current.instance, "hook:deactivated", callback);
}

export function onErrorCaptured(
  callback: (err: Error, vm: Vue, info: string) => boolean | void
) {
  return $on.call(current.instance, "hook:errorCaptured", callback);
}

type Ref<T> = { value: T };
export function ref<T>(value: T): Ref<T> {
  return Object.seal(
    observe({
      value,
      get type() {
        return REFTYPE;
      },
    })
  );
}

type ComputedOption =
  | {
      get: Function;
      set?: Function;
    }
  | Function;
export function computed(option: ComputedOption): Ref<any> {
  let get, set, cacheValue;

  if (typeof option === "object") {
    get = option.get;
    set = option.set;
  } else if (typeof option === "function") {
    get = option;
  }

  const computeRef = ref(cacheValue);

  watch(
    get,
    (value, oldValue) => {
      computeRef.value = value;
    },
    { immediate: true }
  );

  watch(computeRef, (value) => {
    console.log(value);
    set && set(value);
  });

  return computeRef;
}

export function reactive<T>(target: T): T {
  return observe(target);
}

export function provide(key:string|symbol, value:any) {
  // 补充 provided
  const instance = current.instance
  Object.assign(instance._provided ??= {}, { [key]: value })
}


export function inject<T extends string|symbol>(key:T, defaultValue:T|(()=>T), treatDefaultAsFactory:boolean = false):T {
  // vue2 $parent递归
  // vue3/2.7+ Object.create() 原型链
  const args = arguments
  const instance = current.instance
  const findProvideValue = (instance:Vue, key:string|symbol) => {
      if (!instance) {
          if (args.length > 1) {
              return treatDefaultAsFactory && isFunction(defaultValue)
                  ? (defaultValue as Function)!.call(instance)
                  : defaultValue;
          }
          else {
              return warn(`injection "${String(key)}" not found.`);
          }
      } else if (instance['_provided'] && key in instance['_provided']) {
          return instance['_provided'][key]
      } else {
          return findProvideValue(instance['$parent'], key)
      }
  }

  return findProvideValue(instance.$parent, key)
}