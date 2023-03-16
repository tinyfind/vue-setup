var y=(n,r,f)=>{if(!r.has(n))throw TypeError("Cannot "+f)};var w=(n,r,f)=>(y(n,r,"read from private field"),f?f.call(n):r.get(n)),U=(n,r,f)=>{if(r.has(n))throw TypeError("Cannot add the same private member more than once");r instanceof WeakSet?r.add(n):r.set(n,f)},P=(n,r,f,h)=>(y(n,r,"write to private field"),h?h.call(n,f):r.set(n,f),f);(function(n,r){typeof exports=="object"&&typeof module<"u"?r(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],r):(n=typeof globalThis<"u"?globalThis:n||self,r(n.vueSetup={},n.Vue))})(this,function(n,r){var a;"use strict";const h=(e=>e&&typeof e=="object"&&"default"in e?e:{default:e})(r),{$on:m,$once:p,$watch:E,$nextTick:M}=h.default.prototype,$=Symbol("REFTYPE"),b=h.default.observable,O=b({}).__ob__.constructor;function B(e){const o=e.$props,t={attrs:e.$attrs,slots:e.$slots,emit:e.$emit.bind(e)};return[o,t]}function j(e){return!!(e&&e.__ob__&&e.__ob__ instanceof O)}function v(e){return!!(e&&e.type===$)}function R(e){return typeof e=="function"}function D(e,o){return R(e)?[e,o]:j(e)?[()=>e,Object.assign({deep:!0},o)]:v(e)?[()=>e.value,o]:[()=>e,o]}function C(e){console.warn(e)}class V{constructor(){U(this,a,null)}get instance(){return w(this,a)?w(this,a):C("hooks must used in setup")}set instance(o){P(this,a,o)}}a=new WeakMap;let i=new V;function A(){return i.instance}function I(e,o){Reflect.defineProperty(o,"setupState",{value:e}),Object.keys(e).forEach(t=>{if(Reflect.defineProperty(o,t,{get(){const c=Reflect.get(e,t);return v(c)?Reflect.get(c,"value"):c},set(c){return v(e[t])?Reflect.set(e[t],"value",c):Reflect.set(e,t,c),c}}),v(e[t])){const c=e[t];Reflect.defineProperty(o,t,{get(){return c.value},set(u){return c.value=u,u}})}else j(e[t]),o[t]=e[t]})}function L(e){if(typeof e.setup!="function")return e;const o={created(){i.instance=this;try{const t=e.setup.call(void 0,...B(this));if(typeof t=="function")return this.$options.render=t;I(t,this)}finally{i.instance=null}}};return(e.mixins=e.mixins||[]).unshift(o),e}function Y(e){return M.call(i.instance,e)}function _(e,o,t){const[c,u]=D(e,t);let s=new Function;const l=g=>{s=g},d=(g,x)=>{s(),o==null||o(g,x,l)};return E.call(i.instance,c,d,u)}function q(e){let o=new Function;const t=u=>{o=u},c=()=>{o(),e==null||e(t)};return E.call(i.instance,c,new Function,{immediate:!0})}function W(e){p.call(i.instance,"hook:beforeMount",e)}function z(e){p.call(i.instance,"hook:mounted",e)}function F(e){m.call(i.instance,"hook:beforeUpdate",e)}function G(e){m.call(i.instance,"hook:updated",e)}function H(e){p.call(i.instance,"hook:beforeDestroy",e)}function J(e){p.call(i.instance,"hook:destroyed",e)}function K(e){m.call(i.instance,"hook:activated",e)}function N(e){m.call(i.instance,"hook:deactivated",e)}function Q(e){var o,t;((t=(o=i.instance.$options).errorCaptured)!=null?t:o.errorCaptured=[]).push(e)}function T(e){return Object.seal(b({value:e,get type(){return $}}))}function X(e){let o,t,c;typeof e=="object"?(o=e.get,t=e.set):typeof e=="function"&&(o=e);const u=T(c);return _(o,(s,l)=>{u.value=s},{immediate:!0}),_(u,s=>{console.log(s),t&&t(s)}),u}function Z(e){return b(e)}function S(e,o){var c;const t=i.instance;Object.assign((c=t._provided)!=null?c:t._provided={},{[e]:o})}function k(e,o,t=!1){const c=arguments,u=i.instance,s=(l,d)=>l?l._provided&&d in l._provided?l._provided[d]:s(l.$parent,d):c.length>1?t&&R(o)?o.call(l):o:C(`injection "${String(d)}" not found.`);return s(u.$parent,e)}n.computed=X,n.defineComponent=L,n.getCurrentInstance=A,n.inject=k,n.nextTick=Y,n.onActivated=K,n.onBeforeMount=W,n.onBeforeUnmount=H,n.onBeforeUpdate=F,n.onDeactivated=N,n.onErrorCaptured=Q,n.onMounted=z,n.onUnmounted=J,n.onUpdated=G,n.provide=S,n.reactive=Z,n.ref=T,n.watch=_,n.watchEffect=q,Object.defineProperties(n,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
