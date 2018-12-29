const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const nodeExternals = require('webpack-node-externals')
const baseWebpackConfig = require('./webpack.base.conf')
const VueServerPlugin = require('vue-server-renderer/server-plugin')

module.exports = merge(baseWebpackConfig, {
  mode: 'production',
  // 这允许 webpack 以 Node 适用方式(Node-appropriate fashion)处理动态导入(dynamic import)，
  // 并且还会在编译 Vue 组件时，
  // 告知 `vue-loader` 输送面向服务器代码(server-oriented code)。
  target: 'node',
  // 对 bundle renderer 提供 source map 支持
  devtool: 'source-map',
  // entry: path.join(__dirname, '../src/entry-server.js'),
  entry: './src/entry-server.js',
  // 此处告知 server bundle 使用 Node 风格导出模块(Node-style exports)
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-bundle.js'
  },
  resolve: {
    alias: {
      '~api': path.resolve(__dirname, '../src/api/index-server'),
      'api-config': path.resolve(__dirname, '../src/api/config-server')
    }
  },
  externals: nodeExternals({
    // whitelist: /\.css$/
    whitelist: [/\.vue$/, /\.css$/, /\.scss$/, /\.pug$/]
  }),
  plugins: [
    new webpack.DefinePlugin({
      'process.env.VUE_ENV': '"server"'
    }),
    // 默认文件名为 `vue-ssr-server-bundle.json`
    new VueServerPlugin()
  ]
})
