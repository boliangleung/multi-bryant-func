const webpack = require('webpack')
const commonCofig = require('./webpack.common')
const merge = require('webpack-merge')
const devConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    //不支持IE8
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true,
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ]
}
module.exports = merge(commonCofig, devConfig)
