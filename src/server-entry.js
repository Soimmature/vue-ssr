// 服务端
import createApp from './main'

export default () => {
  const { app } = createApp()
  return app
}