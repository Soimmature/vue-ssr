const fs = require('fs')
const path = require('path')
const { promisify } = require('util')

const Koa = require('koa')
const Router = require('koa-router')
const Static = require('koa-static')

const app = new Koa()
const router = new Router()

const VueServerRenderer = require('vue-server-renderer')

const ServerBundle = require('./dist/vue-ssr-server-bundle.json')
// 渲染打包后的结果
const template = fs.readFileSync('./dist/index.ssr.html', 'utf-8')
// 客户端的manifest.json
const clientManifest = require('./dist/vue-ssr-client-manifest.json')
const render = VueServerRenderer.createBundleRenderer(ServerBundle, {
  template,
  clientManifest, // 渲染的时候， 可以找到客户端的js文件, 自动引入到html中
})
const renderToString = promisify(render.renderToString)
router.get('/', async (ctx) => {
  // 通过渲染函数， 渲染我们的vue实例
  ctx.body = await renderToString({ url: '/' })
})

app.use(router.routes())
app.use(Static(path.resolve(__dirname, 'dist')))
// 如果服务器没有此路径， 会渲染当前的app
app.use(async (ctx) => {
  ctx.body = await renderToString({ url: ctx.url })
})
app.listen(3000)

// 集成路由系统
