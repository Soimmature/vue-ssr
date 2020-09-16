// 服务端
import createApp from './main'

export default (context) => {
  return new Promise((resolve, reject) => {
    const { app } = createApp()
    const router = app.$router
    // 返回的实例 应该跳转 到对应的路由
    app.$router.push(context.url)
    // 涉及异步组件需要返回Promise
    router.onReady(() => {
      resolve(app)
    }, reject)
  })
}
