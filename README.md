### how to use this library

### 这个函数库引用的方式，是 umd 格式，适用于 ES module common.js 等大多数主流引入格式

- note:下面的函数是抽取了本人日常开发比较常用的方法和网上的一些比较好的方法(优化了的) ES6+语法<br/>
  我推荐使用 ES module 的引入方法，那样如果你用 webpack 打包的话，可以配置按需加载模块，减少生产环境代码的 JS 体积。

* 这是本作者自己配置的一套 webpack 的配置（针对函数库），我觉得无论是开发还是打包上线速度都是比较快而且好用所以值得推荐给大家。

### 下面是使用方法

- // 安装

```
npm install multi-bryant-func
```

- 引入单个函数

```
import {moneyUpper} from "multi-bryant-func"
//使用方法
/**
 * @title 金额转化成大写
 * @param {Number} number
 * @tips 当你得到了大写字母 你要加间距。你可以通过转化成数组再去for循环样式 或者用正则 用Number初始化数据
 * @example  moneyUpper(12.05).split('').reduce((a,b)=>{return a+`<div>${b}</div>`},'')
 */
```

- 引入一个模块的代码 例如过滤器 filter (因为像 Vue 我们都是引入全部 filter 的)

```
import * as filters from "multi-bryant-func/FunLib/filters"
```

### 函数种类

- 目前一共有四类 common filters message(移动端的提示) validate
- 上面四大类的模块的函数 都支持单个函数引入的方式

#### common 模块

- arrFloat

```
/**
 * @title 数组扁平化
 * @params {Array}
 */
```

- getQueryString

```
/**
 *  获取指定 URL 参数
 * @param {String} name
 **/
```

- preventXSS

```
/**
 *  @title 简单防xss攻击
 *  @param {String} str
 *  @desc 针对上传到服务器的一些数据
 */
```

- js_getDPI

```
/**
*  @title 获取电脑DPI
*  @desc DPI 对于一些打印或者其他切换像素的计算有用
*/
```

- checkEmpty

```
/**
* @title 结果数据的提示
* @param {Object} baseParams 提交的数据
* @param {Object} checkParam 提示的key -value的对象
* @desc 在我们实际开发过程中，如果我们数据不同字段为空时对于着不同的提示 那么我们得写十几个if elseif语句。下面是解决方案
* @useage  tipsArr={imgUrl:'图片路径不可为空',name:'用户姓名不能为空'} checkEmpty(params,tipsArr).then(res=>if(res.errorText){modal(res.errorText)})
*/
```

- checkPwdLevel

```
/**
* @description 检测密码强度
* str 密码 一共有4级
*/
```

- arrDelRepeat

```
/**
 *  @title 数组去重
 *  @param {Array} arr
 */
```

#### filters 模块

- dateFormat

```
/**
 * @desc: Date format
 * @param {Date | Number} date
 * @param {string} fmt 目标字符串格式,默认：yyyy-MM-dd hh:mm:ss
 * @returns {string} 返回格式化后的日期字符串
 *
 * @example
 * dateFormat(0, "yyyy年MM月dd日 第q季度")    // "1970年01月01日 第1季度"
 *
 * @support:
 * yyyy：年
 * q: 季度
 * MM：月
 * dd：日
 * hh: 时
 * mm：分
 * ss：秒
 * S：毫秒
 * vue  (item.createTime|dateFormat(yyyy-MM-dd hh:mm:ss'))
 */
```

- moneyUpper

```
/**
 * @title 金额转化成大写
 * @param {Number} number
 * @tips 当你得到了大写字母 你要加间距。你可以通过转化成数组再去for循环样式 或者用正则 用Number初始化数据
 * @example  moneyUpper(12.05).split('').reduce((a,b)=>{return a+`<div>${b}</div>`},'')
 */
```

#### message 模块

- infor

```
/* 确定弹框*/
infor('是否好好学习',fn())
// fn是回调函数 可加可不加
```

- confirm

```
/* 选择框 */
confirm('是否好好学习',fn())
// 取消不进行任何操作 确定的时候 执行fn
```

#### validate 检验函数

```
/**
 * @title  基础的校验函数
 * @params value:传入的值  type: 检查的类型
 * @retrun type Promise(可进行链式调用) value:{0:'不正确','1':'正确','2':'value为空','3':'类型为空'}
 * @desc   type的枚举 IP: ip地址  IdNo：身份证号码  eMail:又想验证 url：'合法url地址' ,isUpper:'大小写',isChinese:''是否为中文
 */
```

#### 如果想要遇到不会配置的 webpck（正常项目上线 多页面应用等）和函数功能用法 欢饮咨询。 contact:786981510@qq.com

#### 因为最近的项目也比较紧，这是平时晚上抽空总结的东西，可能写的也不是太好，不过我在后续的日子里，会把剩下的函数补充上来。

#### 如果有必要，我在后期将会在掘金分享我的 webpack 和 React 知识(有必要的话)给大家。 掘金号 web_Bryant

#### 本人主攻 Vue 希望和大家多多互相学习互相进步
