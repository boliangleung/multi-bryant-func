const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
module.exports = {
  entry: {
    multi_func: './src/index.js'
  },
  resolve: {
    mainFiles: ['index']
  },
  externals: {
    lodash: 'lodash' //引入库的名字 一定要叫lodash   import lodash from "lodash"
  }, // ['lodash']如果遇到lodash这个库 就不要打包（因为可能别人用你这个库的时候 别人也引用了lodash 会造成浪费） 所以在你利用我这个库的时候 要引入lodash 这个库
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    usedExports: true
  },
  plugins: [new CleanWebpackPlugin()],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    library: 'Brt' // //增加Brt这个全局变量   // 如果用this   则可以 this.libraray就可以调用这个库了
  }
}

// babel 记得装transform-runtime 专门处理函数库的
