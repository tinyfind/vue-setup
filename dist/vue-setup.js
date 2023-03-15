var b = (n, e, t) => {
  if (!e.has(n))
    throw TypeError("Cannot " + t);
};
var h = (n, e, t) => (b(n, e, "read from private field"), t ? t.call(n) : e.get(n)), v = (n, e, t) => {
  if (e.has(n))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(n) : e.set(n, t);
}, _ = (n, e, t, r) => (b(n, e, "write to private field"), r ? r.call(n, t) : e.set(n, t), t);
import w from "vue";
const { $on: l, $once: d, $watch: R, $nextTick: P } = w.prototype, $ = Symbol("REFTYPE"), m = w.observable, O = m({}).__ob__.constructor;
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
function a(n) {
  return !!(n && n.type === $);
}
function j(n) {
  return typeof n == "function";
}
function U(n, e) {
  return j(n) ? [n, e] : E(n) ? [() => n, Object.assign({ deep: !0 }, e)] : a(n) ? [() => n.value, e] : [() => n, e];
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
let o = new y();
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
      E(n[t]), e[t] = n[t];
  });
}
function A(n) {
  if (typeof n.setup != "function")
    return n;
  const e = {
    created() {
      o.instance = this;
      try {
        const t = n.setup.call(
          void 0,
          ...T(this)
        );
        if (typeof t == "function")
          return this.$options.render = t;
        B(t, this);
      } finally {
        o.instance = null, delete n.setup;
      }
    }
  };
  return (n.mixins = n.mixins || []).unshift(e), n;
}
function I(n) {
  return P.call(o.instance, n);
}
function g(n, e, t) {
  const [r, c] = U(n, t);
  let i = new Function();
  const u = (p) => {
    i = p;
  }, s = (p, x) => {
    i(), e == null || e(p, x, u);
  };
  return R.call(o.instance, r, s, c);
}
function W(n) {
  let e = new Function();
  const t = (c) => {
    e = c;
  }, r = () => {
    e(), n == null || n(t);
  };
  return R.call(o.instance, r, new Function(), {
    immediate: !0
  });
}
function q(n) {
  return d.call(o.instance, "hook:beforeMount", n);
}
function z(n) {
  return d.call(o.instance, "hook:mounted", n);
}
function F(n) {
  return l.call(o.instance, "hook:beforeUpdate", n);
}
function G(n) {
  return l.call(o.instance, "hook:updated", n);
}
function H(n) {
  return d.call(o.instance, "hook:beforeDestroy", n);
}
function J(n) {
  return d.call(o.instance, "hook:destroyed", n);
}
function K(n) {
  return l.call(o.instance, "hook:activated", n);
}
function L(n) {
  return l.call(o.instance, "hook:deactivated", n);
}
function N(n) {
  return l.call(o.instance, "hook:errorCaptured", n);
}
function M(n) {
  return Object.seal(
    m({
      value: n,
      get type() {
        return $;
      }
    })
  );
}
function Q(n) {
  let e, t, r;
  typeof n == "object" ? (e = n.get, t = n.set) : typeof n == "function" && (e = n);
  const c = M(r);
  return g(
    e,
    (i, u) => {
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
  var r;
  const t = o.instance;
  Object.assign((r = t._provided) != null ? r : t._provided = {}, { [n]: e });
}
function k(n, e, t = !1) {
  const r = arguments, c = o.instance, i = (u, s) => u ? u._provided && s in u._provided ? u._provided[s] : i(u.$parent, s) : r.length > 1 ? t && j(e) ? e.call(u) : e : C(`injection "${String(s)}" not found.`);
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
