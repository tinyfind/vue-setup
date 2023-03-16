import Vue from "vue";

const { $on, $once, $watch, $nextTick } = Vue.prototype;

export const REFTYPE = Symbol("REFTYPE");
export const observe = Vue.observable;
// class Observable
// @ts-ignore
const Observable = observe({}).__ob__.constructor;

export { $on, $once, $watch, $nextTick };

export function getSetupParams(instance) {
  const props = instance.$props;
  const context = {
    attrs: instance.$attrs,
    slots: instance.$slots,
    emit: instance.$emit.bind(instance),
    // expose 暴露
  };
  return [props, context];
}

export function isReactive(value) {
  return !!(value && value.__ob__ && value.__ob__ instanceof Observable);
}

export function isRef(value) {
  return !!(value && value.type === REFTYPE);
}

export function isFunction(value:any):boolean {
  return typeof value === "function";
}

export function isObject(target:any):boolean {
  return Object.prototype.toString.call(target) === '[object Object]'
}

export function getWatchTarget(target, option) {
  if (isFunction(target)) return [target, option];
  if (isReactive(target))
    return [() => target, Object.assign({ deep: true }, option)];
  if (isRef(target)) return [() => target.value, option];

  return [() => target, option];
}

export function warn(msg){
  console.warn(msg)
}