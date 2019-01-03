// const path = require('path')
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/* eslint-disable */
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const isProduction = process.env.NODE_ENV === 'production'

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  // entry: {
  //   'app': path.join(__dirname, '../src/entry-client.js')
  // },
  entry: './src/entry-client.js',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          isProduction ? MiniCssExtractPlugin.loader : 'vue-style-loader',
          'css-loader',
          'sass-loader',
        ]
      },
    ]
  },
  devtool: config.dev.devtool, //  cheap-module-eval-source-map编译更快
  devServer: {
    contentBase: '../dist',
    hot: true
  },
  plugins: [
    // webpack4.0版本以上采用MiniCssExtractPlugin 而不使用extract-text-webpack-plugin
    new MiniCssExtractPlugin({
      filename: isProduction ? utils.assetsPath('css/[name].[contenthash].css') : '[name].css',
      chunkFilename: isProduction ? utils.assetsPath('css/[name].[contenthash].css') : '[id].css',
    }),
    // 热加载必备
    new webpack.HotModuleReplacementPlugin(),
    // 友好错误提示
    new FriendlyErrorsPlugin({
      onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
    })
  ]
})

module.exports = devWebpackConfig
