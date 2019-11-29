process.env.NODE_ENV = 'production'
const commonCofig = require('./webpack.common')
const webpack = require('webpack')
const merge = require('webpack-merge')
const devConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [ new webpack.optimize.OccurrenceOrderPlugin()],
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'Brt' // //增加Brt这个全局变量   // 如果用this   则可以 this.libraray就可以调用这个库了
  }
}
module.exports = merge(commonCofig, devConfig)
