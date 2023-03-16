## what is hook ?

> 逻辑封装/函数式

## hook vs mixin

> 无侵入性/易用

## how to use

- `hooks` 需要放置在 `setup` 函数中
- `setup` 需要在 `defineComponent` 中才能正常解析
- 使用可以参考 [`vue3`](https://cn.vuejs.org/api/composition-api-setup.html#setup-context)

>`defineCompnent`

```js
  export default defineComponent({
    setup(){
      // 
      myHooks()
    },
    created(){

    },
    // ...
  })

```
>`setup`
- 如果需要返回数据，以对象形式返回,模板语法直接引用即可
- 如果需要返回组件函数，直接返回即可
```js
  defineComponent({
    setup(props,{emit,attrs,slots}){
      const num = ref(0)

      return {
        num
      }
    }
  })

    defineComponent({
    setup(){
      const num = ref(0)

      return (h)=>{
        h('div',{},num.value)
      }
    }
  })

```


## how to create hook

> 创建:

```js
import { watch, reactive } from 'hooks'
export default function () {
  const obj = reactive({ name: 'li' })
  const change = () => {
    obj.name = 'zz'
  }

  watch(
    obj
    () => {
      const 
    },
    { deep: true }
  )

  return {
    obj,
    change
  }
}
```



## hooks

### `reactive`

> `ref`
-  setup 导出的 ref 对象会直接绑定在 vue 实例中，可以直接通过`this[key]` 访问和修改
  ```js
  const name = ref('dong')
  name.value = 'zz'
  ```

> `reactive`
- 仅支持`Object`,`Array`建议使用`ref`

  ```js
    const obj = reactive({name:'dong'})
    obj.name = 'dong'
  ```
> `computed`
 - `computed`返回一个可以自由控制`get`和`set`的`ref`对象
  ```typeScript
    type Computed = (any)=>Ref<any>
  ```
  ```js
    const refNum = ref(1)
    const num = compute(()=>refNum.value)
    const num = compute({get(){},set(){}})

    // isRef(num) = true
  ```


### `tools`
> `provide`
- 向子孙组件暴露数据
```ts
  type Provide = (key:string|Symbol,value:any)=>void
```
```js
  provide("color$1","red")
```
> `inject`
- 获取父祖组件暴露的数据
```ts
  type Inject = <T>(key:string|Symbol, defaultValue:T|(()=>T), treatDefaultAsFactory:boolean)=>T
```
```js
  const name = inject('name','dong')
```
> `isRef`
- 判断是否是`ref`响应式对象

> `isReactive`
- 判断是否是`reactive`响应式对象
> `watch`
- 监听响应式数据
```ts
  type Callback = (onInvalidate:(Function)=>void)=>void
  type Watch = (observe:Reactive|Ref|Function,callback?:Callback,options?:{immediate?:Boolean,deep?:Boolean})=>Function

```
```js
  const test = ref('name')
  const stopWatch = watch(test,(onInvalidate)=>{
    const timer = setInterval(()=>{
      console.log('...')
      onInvalidate(()=>{
        clearInterval(timer)
      })
    })
  })
  // onInvalidate 每次触发watch时会触发，可以用作清除副作用
  stopWatch()// 暂停监听
```
> `watchEffect`
- 相比`watch`,更加简洁
```js
    const id = ref('xxxxx')
    watchEffect((clear)=>{
        const link = fetchUrl('xxxx',{id:id.value})

        clear(()=>{
            link.cancel()
        })
    })
```
### `lifeCycle`
- 参数为`Function`，具体参考 `vue` 生命周期
```typeScript
  type LifeCycle = (callback:Function)=>void
```
>onBeforeMounted

>onMounted

>onBeforeUpdate

>onUpdated

>onBeforeUnmount

>onUnmount

>onActivated

>onDeactivated

>onErrorCaptured







