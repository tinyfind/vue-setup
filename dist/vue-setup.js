var _ = (n, e, t) => {
  if (!e.has(n))
    throw TypeError("Cannot " + t);
};
var m = (n, e, t) => (_(n, e, "read from private field"), t ? t.call(n) : e.get(n)), g = (n, e, t) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, t);
}, R = (n, e, t, r) => (_(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t);
import j from "vue";
const { $on: p, $once: h, $watch: w, $nextTick: P } = j.prototype, E = Symbol("REFTYPE"), v = j.observable, T = v({}).__ob__.constructor;
function U(n) {
  const e = n.$props, t = {
    attrs: n.$attrs,
    slots: n.$slots,
    emit: n.$emit.bind(n)
  };
  return [e, t];
}
function O(n) {
  return !!(n && n.__ob__ && n.__ob__ instanceof T);
}
function a(n) {
  return !!(n && n.type === E);
}
function f(n) {
  return typeof n == "function";
}
function C(n) {
  return Object.prototype.toString.call(n) === "[object Object]";
}
function y(n, e) {
  return f(n) ? [n, e] : O(n) ? [() => n, Object.assign({ deep: !0 }, e)] : a(n) ? [() => n.value, e] : [() => n, e];
}
function d(n) {
  console.warn(n);
}
var l;
class A {
  constructor() {
    g(this, l, null);
  }
  get instance() {
    return m(this, l) ? m(this, l) : d("hooks must used in setup");
  }
  set instance(e) {
    R(this, l, e);
  }
}
l = new WeakMap();
let o = new A();
function Y() {
  return o.instance;
}
function B(n, e) {
  Reflect.defineProperty(e, "setupState", { value: n }), Object.keys(n).forEach((t) => {
    if (Reflect.defineProperty(e, t, {
      get() {
        const r = Reflect.get(n, t);
        return a(r) ? Reflect.get(r, "value") : r;
      },
      set(r) {
        return a(n[t]) ? Reflect.set(n[t], "value", r) : Reflect.set(n, t, r), r;
      }
    }), a(n[t])) {
      const r = n[t];
      Reflect.defineProperty(e, t, {
        get() {
          return r.value;
        },
        set(c) {
          return r.value = c, c;
        }
      });
    } else
      O(n[t]), e[t] = n[t];
  });
}
function I(n) {
  if (!f(n.setup))
    return n;
  const e = {
    created() {
      o.instance = this;
      try {
        const t = n.setup.call(
          void 0,
          ...U(this)
        );
        if (f(t))
          return this.$options.render = t;
        C(t), B(t, this);
      } finally {
        o.instance = null;
      }
    }
  };
  return (n.mixins = n.mixins || []).unshift(e), n;
}
function W(n) {
  return P.call(o.instance, n);
}
function $(n, e, t) {
  const [r, c] = y(n, t);
  let i = new Function();
  const s = (b) => {
    i = b;
  }, u = (b, x) => {
    i(), e == null || e(b, x, s);
  };
  return w.call(o.instance, r, u, c);
}
function q(n) {
  let e = new Function();
  const t = (c) => {
    e = c;
  }, r = () => {
    e(), n == null || n(t);
  };
  return w.call(o.instance, r, new Function(), {
    immediate: !0
  });
}
function z(n) {
  h.call(o.instance, "hook:beforeMount", n);
}
function F(n) {
  h.call(o.instance, "hook:mounted", n);
}
function G(n) {
  p.call(o.instance, "hook:beforeUpdate", n);
}
function H(n) {
  p.call(o.instance, "hook:updated", n);
}
function J(n) {
  h.call(o.instance, "hook:beforeDestroy", n);
}
function K(n) {
  h.call(o.instance, "hook:destroyed", n);
}
function L(n) {
  p.call(o.instance, "hook:activated", n);
}
function N(n) {
  p.call(o.instance, "hook:deactivated", n);
}
function Q(n) {
  var e, t;
  ((t = (e = o.instance.$options).errorCaptured) != null ? t : e.errorCaptured = []).push(n);
}
function M(n) {
  return Object.seal(
    v({
      value: n,
      get type() {
        return E;
      }
    })
  );
}
function X(n) {
  let e, t, r;
  typeof n == "object" ? (e = n.get, t = n.set) : f(n) && (e = n);
  const c = M(r);
  return $(
    e,
    (i, s) => {
      c.value = i;
    },
    { immediate: !0 }
  ), $(c, (i) => {
    console.log(i), t && t(i);
  }), c;
}
function Z(n) {
  return C(n) ? v(n) : (Array.isArray(n) ? d("Array should use ref") : d("param should type Object"), n);
}
function k(n, e) {
  var r;
  const t = o.instance;
  Object.assign((r = t._provided) != null ? r : t._provided = {}, { [n]: e });
}
function S(n, e, t = !1) {
  const r = arguments, c = o.instance, i = (s, u) => s ? s._provided && u in s._provided ? s._provided[u] : i(s.$parent, u) : r.length > 1 ? t && f(e) ? e.call(s) : e : d(`injection "${String(u)}" not found.`);
  return i(c.$parent, n);
}
export {
  X as computed,
  I as defineComponent,
  Y as getCurrentInstance,
  S as inject,
  W as nextTick,
  L as onActivated,
  z as onBeforeMount,
  J as onBeforeUnmount,
  G as onBeforeUpdate,
  N as onDeactivated,
  Q as onErrorCaptured,
  F as onMounted,
  K as onUnmounted,
  H as onUpdated,
  k as provide,
  Z as reactive,
  M as ref,
  $ as watch,
  q as watchEffect
};
