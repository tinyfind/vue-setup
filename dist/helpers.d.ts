declare const $on: any, $once: any, $watch: any, $nextTick: any;
export declare const REFTYPE: unique symbol;
export declare const observe: <T>(obj: T) => T;
export { $on, $once, $watch, $nextTick };
export declare function getSetupParams(instance: any): any[];
export declare function isReactive(value: any): boolean;
export declare function isRef(value: any): boolean;
export declare function isFunction(value: any): boolean;
export declare function isObject(target: any): boolean;
export declare function getWatchTarget(target: any, option: any): any[];
export declare function warn(msg: any): void;
