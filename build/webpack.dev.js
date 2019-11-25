const commonCofig = require('./webpack.common')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const devConfig = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new HtmlWebpackPlugin({
      title: 'multi-test-fun'
    })
  ]
}
module.exports = merge(commonCofig, devConfig)
