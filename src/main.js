import Vue from 'vue'
import App from './App.vue'

import createRouter from './router'
import createStore from './store'

// 提供vue实例
// 服务端渲染， 每个都要有一个自己的实例
export default () => {
  const router = createRouter()
  const store = createStore()
  const app = new Vue({
    router,
    store,
    render: (h) => h(App),
  })

  return { app, router, store }
}
