const path = require('path')

const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ServerRenderPlugin = require('vue-server-renderer/server-plugin')

const base = require('./webpack.base')

const resolve = (dir) => {
  return path.resolve(__dirname, dir)
}

module.exports = merge(base, {
  entry: {
    server: resolve('../src/server-entry.js'),
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2', // 把最终这个文件导出的结果 放到 module.exports 上
  },
  plugins: [
    new ServerRenderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.ssr.html',
      template: resolve('../public/index.ssr.html'),
      excludeChunks: ['server'],
      minify: {
        collapseWhitespace: true,
        removeComments: false,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
      },
    }),
  ],
})
