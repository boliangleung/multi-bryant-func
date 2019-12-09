process.env.NODE_ENV = 'development'
const commonCofig = require('./webpack.common')
const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    clientLogLevel: 'none', //WebpackDevServer自身的日志保持沉默，因为它们通常不起作用。使用此设置，它仍将显示编译警告和错误。
    watchOptions: {
      //避免了一些系统的CPU过载。
      ignored: /node_modules/
    },
    compress: true, //启动gzip压缩
    port: 9000,
    open: true,
    hot: true,  //热加载
    quiet: true // 不显示webpack的打包信息在测试环境
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'multi-test-fun'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    // path: path.resolve(__dirname, '../dist'),  //
    filename: '[name]'
  }
}
module.exports = merge(commonCofig, devConfig)
