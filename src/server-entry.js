// 服务端
import createApp from './main'

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app, router, store } = createApp()
    // 返回的实例 应该跳转 到对应的路由
    router.push(context.url)
    // 涉及异步组件需要返回Promise
    router.onReady(() => {
      // 获取路由跳转到匹配的组件
      const matches = router.getMatchedComponents()
      // matches匹配到的所有组件，整个都在服务端执行的
      Promise.all(
        matches.map((component) => {
          if (component.asyncData) {
            // asyncData在服务端调用
            return component.asyncData(store)
          }
        })
      ).then(() => {
        // 以上all中的方法，会改变store的state
        // 把vuex的状态挂载到上下文中， 会将状态挂到window上
        context.state = store.state
        resolve(app)
      })
    }, reject)
  })
}
