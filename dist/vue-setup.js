var b = (n, e, t) => {
  if (!e.has(n))
    throw TypeError("Cannot " + t);
};
var h = (n, e, t) => (b(n, e, "read from private field"), t ? t.call(n) : e.get(n)), v = (n, e, t) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, t);
}, _ = (n, e, t, o) => (b(n, e, "write to private field"), o ? o.call(n, t) : e.set(n, t), t);
import $ from "vue";
const { $on: a, $once: d, $watch: w, $nextTick: P } = $.prototype, R = Symbol("REFTYPE"), m = $.observable, O = m({}).__ob__.constructor;
function T(n) {
  const e = n.$props, t = {
    attrs: n.$attrs,
    slots: n.$slots,
    emit: n.$emit.bind(n)
  };
  return [e, t];
}
function E(n) {
  return !!(n && n.__ob__ && n.__ob__ instanceof O);
}
function l(n) {
  return !!(n && n.type === R);
}
function j(n) {
  return typeof n == "function";
}
function U(n, e) {
  return j(n) ? [n, e] : E(n) ? [() => n, Object.assign({ deep: !0 }, e)] : l(n) ? [() => n.value, e] : [() => n, e];
}
function C(n) {
  console.warn(n);
}
var f;
class y {
  constructor() {
    v(this, f, null);
  }
  get instance() {
    return h(this, f) ? h(this, f) : C("hooks must used in setup");
  }
  set instance(e) {
    _(this, f, e);
  }
}
f = new WeakMap();
let r = new y();
function Y() {
  return r.instance;
}
function B(n, e) {
  Reflect.defineProperty(e, "setupState", { value: n }), Object.keys(n).forEach((t) => {
    if (Reflect.defineProperty(e, t, {
      get() {
        const o = Reflect.get(n, t);
        return l(o) ? Reflect.get(o, "value") : o;
      },
      set(o) {
        return l(n[t]) ? Reflect.set(n[t], "value", o) : Reflect.set(n, t, o), o;
      }
    }), l(n[t])) {
      const o = n[t];
      Reflect.defineProperty(e, t, {
        get() {
          return o.value;
        },
        set(c) {
          return o.value = c, c;
        }
      });
    } else
      E(n[t]), e[t] = n[t];
  });
}
function A(n) {
  if (typeof n.setup != "function")
    return n;
  const e = {
    created() {
      r.instance = this;
      try {
        const t = n.setup.call(
          void 0,
          ...T(this)
        );
        if (typeof t == "function")
          return this.$options.render = t;
        B(t, this);
      } finally {
        r.instance = null;
      }
    }
  };
  return (n.mixins = n.mixins || []).unshift(e), n;
}
function I(n) {
  return P.call(r.instance, n);
}
function g(n, e, t) {
  const [o, c] = U(n, t);
  let i = new Function();
  const s = (p) => {
    i = p;
  }, u = (p, x) => {
    i(), e == null || e(p, x, s);
  };
  return w.call(r.instance, o, u, c);
}
function W(n) {
  let e = new Function();
  const t = (c) => {
    e = c;
  }, o = () => {
    e(), n == null || n(t);
  };
  return w.call(r.instance, o, new Function(), {
    immediate: !0
  });
}
function q(n) {
  d.call(r.instance, "hook:beforeMount", n);
}
function z(n) {
  d.call(r.instance, "hook:mounted", n);
}
function F(n) {
  a.call(r.instance, "hook:beforeUpdate", n);
}
function G(n) {
  a.call(r.instance, "hook:updated", n);
}
function H(n) {
  d.call(r.instance, "hook:beforeDestroy", n);
}
function J(n) {
  d.call(r.instance, "hook:destroyed", n);
}
function K(n) {
  a.call(r.instance, "hook:activated", n);
}
function L(n) {
  a.call(r.instance, "hook:deactivated", n);
}
function N(n) {
  var e, t;
  ((t = (e = r.instance.$options).errorCaptured) != null ? t : e.errorCaptured = []).push(n);
}
function M(n) {
  return Object.seal(
    m({
      value: n,
      get type() {
        return R;
      }
    })
  );
}
function Q(n) {
  let e, t, o;
  typeof n == "object" ? (e = n.get, t = n.set) : typeof n == "function" && (e = n);
  const c = M(o);
  return g(
    e,
    (i, s) => {
      c.value = i;
    },
    { immediate: !0 }
  ), g(c, (i) => {
    console.log(i), t && t(i);
  }), c;
}
function X(n) {
  return m(n);
}
function Z(n, e) {
  var o;
  const t = r.instance;
  Object.assign((o = t._provided) != null ? o : t._provided = {}, { [n]: e });
}
function k(n, e, t = !1) {
  const o = arguments, c = r.instance, i = (s, u) => s ? s._provided && u in s._provided ? s._provided[u] : i(s.$parent, u) : o.length > 1 ? t && j(e) ? e.call(s) : e : C(`injection "${String(u)}" not found.`);
  return i(c.$parent, n);
}
export {
  Q as computed,
  A as defineComponent,
  Y as getCurrentInstance,
  k as inject,
  I as nextTick,
  K as onActivated,
  q as onBeforeMount,
  H as onBeforeUnmount,
  F as onBeforeUpdate,
  L as onDeactivated,
  N as onErrorCaptured,
  z as onMounted,
  J as onUnmounted,
  G as onUpdated,
  Z as provide,
  X as reactive,
  M as ref,
  g as watch,
  W as watchEffect
};
