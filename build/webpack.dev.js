const commonCofig = require('./webpack.common')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devConfig = {
  mode: 'development',
  devServer: {
    contentBase: path.join(__dirname, '../dist'),
    compress: true,
    port: 9000,
    open: true
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: 'index.html',
      title: 'multi-test-fun'
    })
  ]
}
module.exports = merge(commonCofig, devConfig)
