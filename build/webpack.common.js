const path = require('path')
const FS = require('fs')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production' ? true : false
const entry = {}
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin')
// const isInteractive = process.stdout.isTTY //判断是否在终端
//合并文件夹的JS 全部抛出
const mergeFiles = function(relativeFloader, exportFilePath) {
  const readFiles = []
  let newFileData = ''
  let mergeFileProgress = 0
  const files = FS.readdirSync(path.resolve(__dirname, relativeFloader))
  files.forEach(file => {
    if (/.*\.js/.test(file)) {
      readFiles.push(path.resolve(__dirname, relativeFloader, file))
    }
  })
  for (let i = 0; i < readFiles.length; i++) {
    newFileData += FS.readFileSync(readFiles[i])
    mergeFileProgress++
    console.log('打包前读取第' + mergeFileProgress + '个文件。')
  }
  FS.writeFile(exportFilePath, newFileData, err => {
    if (null != err) {
      throw err
    } else {
      console.log('总共合并 ' + readFiles.length + '个文件 ')
    }
  })
}
const getDevEntry = function(relativeFloader) {
  const files = FS.readdirSync(path.resolve(__dirname, relativeFloader))
  files.forEach(file => {
    if (/.*\.js/.test(file)) {
      entry[file] = path.resolve(__dirname, relativeFloader, file)
    }
  })
}
//因为生产环境是合成文件再打包的，如果测试环境也合成 不但效率慢 而且无法启用热更新功能 因为entry是合成文件，无法监听JS变化
if (isProd) {
  // 把合并的文件存放在dist文件。 等打包完后可自动删除
  mergeFiles('../FunLib', './dist/allExport.js')
  entry['multi_func'] = './dist/allExport.js'
} else {
  getDevEntry('../FunLib')
}
module.exports = {
  bail: true, //打包错误的时候 停止打包
  entry,
  resolve: {
    mainFiles: ['index']
  },
  externals: {
    // lodash: 'lodash' //引入库的名字 一定要叫lodash   import lodash from "lodash"
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
  plugins: [new CleanWebpackPlugin(), new FriendlyErrorsWebpackPlugin()],
  performance: false,
  output: {
    path: path.resolve(__dirname, '../dist')
  }
}
