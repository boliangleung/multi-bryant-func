const commonCofig = require('./webpack.common')
const merge = require('webpack-merge')
const devConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map'
}
module.exports = merge(commonCofig, devConfig)
