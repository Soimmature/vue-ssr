const fs = require('fs')
const path = require('path')

const Koa = require('koa')
const Router = require('koa-router')
const Static = require('koa-static')

const app = new Koa()
const router = new Router()

const Vue = require('vue')
const VueServerRenderer = require('vue-server-renderer')
const vm = new Vue({
  data() {
    return {
      name: 'Twinkle 陈',
    }
  },
  template: `<div>{{name}}</div>`,
})

// 创建一个渲染器
const template = fs.readFileSync('./template.html', 'utf-8')
let render = VueServerRenderer.createRenderer({
  template, // 模板中必须有
})

router.get('/', async (ctx) => {
  // 通过渲染函数， 渲染我们的vue实例
  ctx.body = await render.renderToString(vm)
})

app.use(router.routes())
// app.use(Static())
app.listen(3000)
