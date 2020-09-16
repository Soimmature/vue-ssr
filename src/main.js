import Vue from 'vue'
import App from './App.vue'

// 提供vue实例
// 服务端渲染， 每个都要有一个自己的实例
export default () => {
  const app = new Vue({
    render: (h) => h(App),
  })

  return { app }
}
