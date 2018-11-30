const path = require('path')
const utils = require('./utils')
const config = require('../config')
// vue-loader v15版本需要引入此插件
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 服务端渲染用到的插件、默认生成JSON
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

// 用于返回文件相对于根目录的绝对路径
const resolve = dir => path.posix.join(__dirname, '..', dir)

// 创建ESlint相关rules
const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  // include: [resolve('src'), resolve('server')],
  include: [path.resolve(__dirname, '../src'), path.resolve(__dirname, '../server')],
  options: {
    // 更友好、更详细的提示
    formatter: require('eslint-friendly-formatter'),
    // 只给出警告，开发有很好的体验，emitError为true会阻止浏览器显示内容
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  // entry: resolve('src/entry-client.js'),
  entry: './src/entry-client.js',
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    // 使用的扩展名
    extensions: ['.js', '.vue'],
    // 模块别名列表
    alias: {
      'components': resolve('src/components'),
      'assets': resolve('src/assets'),
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        // 编译.vue文件, vue-cli2还包含vue-loader.conf.js,
        // 但vue-loader15已经将大部分配置改为默认，所以没必要新建个文件
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          // 配置哪些引入路径按照模块方式查找
          transformAssetUrls: {
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
        }
      },
      {
        test: /\.js$/, // 利用babel-loader编译js，使用更高的特性，排除npm下载的.vue组件
        loader: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // 处理图片
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: utils.assetsPath('img/[name].[hash:7].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/, // 处理字体
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new VueSSRClientPlugin()
  ]
}
