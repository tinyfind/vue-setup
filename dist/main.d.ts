import type { WatchOptions, ComponentOptions, CreateElement, VNode } from "vue";
import type { Vue } from "vue/types/vue";
export declare function getCurrentInstance(): Vue;
type Props = Record<string, any>;
type Context = {
    attrs?: Record<string, any>;
    emits?: Function;
    slots?: Function;
};
type Render = (CreateElement: CreateElement) => VNode;
type Setup = (props: Props, context: Context) => Object | Render;
type DefineComponentOptions = ComponentOptions<Vue> & {
    setup?: Setup;
};
export declare function defineComponent(option: DefineComponentOptions): DefineComponentOptions;
export declare function nextTick(callback?: Function): Promise<void>;
type EffectFunWatch = (value: any, oldValue: any, onCleanup: (clean?: Function) => void) => void;
export declare function watch(target: object | Function, effectFun?: EffectFunWatch, option?: WatchOptions): any;
type EffectFunWatchEffect = (onCleanup: (clean?: Function) => void) => void;
export declare function watchEffect(effectFun: EffectFunWatchEffect): Function;
export declare function onBeforeMount(callback: Function): void;
export declare function onMounted(callback: Function): void;
export declare function onBeforeUpdate(callback: Function): void;
export declare function onUpdated(callback: Function): void;
export declare function onBeforeUnmount(callback: Function): void;
export declare function onUnmounted(callback: Function): void;
export declare function onActivated(callback: Function): void;
export declare function onDeactivated(callback: Function): void;
export declare function onErrorCaptured(callback: (err: Error, vm: Vue, info: string) => boolean | void): void;
type Ref<T> = {
    value: T;
};
export declare function ref<T>(value: T): Ref<T>;
type ComputedOption = {
    get: Function;
    set?: Function;
} | Function;
export declare function computed(option: ComputedOption): Ref<any>;
export declare function reactive<T>(target: T): T;
export declare function provide(key: string | symbol, value: any): void;
export declare function inject<T extends string | symbol>(key: T, defaultValue: T | (() => T), treatDefaultAsFactory?: boolean): T;
export {};
