'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.common')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizePlugin = require('./plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const config = require('../config')

module.exports = merge(baseWebpackConfig(config), {
      mode: 'development',
      entry: {
        app: path.join(__dirname,'../src/main.js')
      },
      module: {
          rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
      },
      // cheap-module-eval-source-map is faster for development
      devtool: config.dev.devtool,

      // these devServer options should be customized in /config/index.js
      devServer: {
          clientLogLevel: 'error',
          historyApiFallback: {
              rewrites: [
                  { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') }
              ]
          },
          hot: true,
          contentBase: false, // since we use CopyWebpackPlugin.
          compress: true,
          host: HOST || config.dev.host,
          port: PORT || config.dev.port,
          open: false,
          https: config.dev.https || false,
          openPage: config.dev.host,
          overlay: config.dev.errorOverlay
              ? { warnings: false, errors: true }
              : false,
          publicPath: config.dev.assetsPublicPath,
          proxy: config.dev.proxyTable,
          quiet: true, // necessary for FriendlyErrorsPlugin
          watchOptions: {
              poll: config.dev.poll
          },
          disableHostCheck: true // 是否禁用检查hostname
      },
      plugins: [
          new webpack.HotModuleReplacementPlugin(),
          new OptimizePlugin(baseWebpackConfig(config)),
          new HtmlWebpackPlugin({
            filename: `index.html`,
            template: path.join(__dirname, '../public/index.html'),
            inject: true,
            chunks: ['app', 'vendors']
        })
      ]
})
