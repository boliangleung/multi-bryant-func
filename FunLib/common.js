/**
 * @title 数组扁平化
 * @params {Array}
 */
const arrFloat = arr => {
  return arr.flat(Infinity)
}

/**
 *  获取指定 URL 参数
 * @param {String} name
 **/
const getQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

/**
 *  @title 简单防xss攻击
 *  @param {String} str
 *  @desc 针对上传到服务器的一些数据
 */
const preventXSS = str => {
  return str
    .replace(/javascript:/gi, '')
    .replace(/script/gi, '')
    .replace(/< *[a-zA-Z]+.*>/, '')
}

/**
 *  @title 获取电脑DPI
 *  @desc DPI 对于一些打印或者其他切换像素的计算有用
 */
const js_getDPI = () => {
  var arrDPI = new Array()
  if (window.screen.deviceXDPI != undefined) {
    arrDPI[0] = window.screen.deviceXDPI
    arrDPI[1] = window.screen.deviceYDPI
  } else {
    var tmpNode = document.createElement('DIV')
    tmpNode.style.cssText =
      'width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden'
    document.body.appendChild(tmpNode)
    arrDPI[0] = parseInt(tmpNode.offsetWidth)
    arrDPI[1] = parseInt(tmpNode.offsetHeight)
    tmpNode.parentNode.removeChild(tmpNode)
  }
  return arrDPI
}

/**
 * @title 结果数据的提示
 * @param {Object} baseParams 提交的数据
 * @param {Object} checkParam 提示的key -value的对象
 * @desc 在我们实际开发过程中，如果我们数据不同字段为空时对于着不同的提示 那么我们得写十几个if elseif语句。下面是解决方案
 * @useage  tipsArr={imgUrl:'图片路径不可为空',name:'用户姓名不能为空'} checkEmpty(params,tipsArr).then(res=>if(res.errorText){modal(res.errorText)})
 */

const checkEmpty = async (baseParams, checkParam) => {
  for (const key in checkParam) {
    if (baseParams[key].trim() === '') {
      return {
        errorText: checkParam[key] || `${key} can no be empty,please check!`
      }
    }
  }
  return { errorText: false }
}

/**
 * @description 检测密码强度
 * str 密码 一共有4级
 */
const checkPwdLevel = str => {
  let nowLv = 0
  if (str.length < 8) {
    return nowLv
  }
  //把规则整理成数组，再进行循环判断
  let rules = [/[0-9]/, /[a-z]/, /[A-Z]/, /[\.|-|_]/]
  for (let i = 0; i < rules.length; i++) {
    if (rules[i].test(str)) {
      nowLv++
    }
  }
  return nowLv
}

/**
 *  @title 数组去重
 *  @param {Array} arr
 *  @returns {Boolean}
 */

const arrDelRepeat = arr => {
  const tmp = Array.from(new Set(arr))
  return [...new Set(tmp)]
}

/**
 * @title 生成范围随机数
 * @param {Number} min 最小
 * @param {Number} max 最小
 */
const RandomNum = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min

/**
 * @title 判断数据类型
 * @param {Number} tgt 数据
 * @param {String} type 类型
 * DataType('young') // "string"
   DataType(20190214) // "number"
   DataType(true) // "boolean"
   DataType([], 'array') // true
   DataType({}, 'array') // false
 */
function DataType(tgt, type) {
  const type = Object.prototype.toString
    .call(tgt)
    .replace(/\[object (\w+)\]/, '$1')
    .toLowerCase()
  return type ? dataType === type : dataType
}

/**
 * @title 是否为空对象
 * @param {Object} obj
 * @return {Boolean}
 */

const isEmptyObject = obj => {
  for (let key in obj) {
    return false
  }
  return true
}
/**
 * @title 混淆数组
 * @param {Array} arr
 * @returns {Array}
 */
const confusedArr = arr => arr.slice().sort(() => Math.random() - 0.5)

/**
 * 计算年龄
 * @param {String} birthString  传入Date类型的字符串格式 '1996-04-14' '1996/04/14' 或者时间戳也可以
 * @param {Date} now
 * @returns {int}
 * getAge('1996-04-14')
 */
const getAge = (birthString, now = new Date()) => {
  let age
  let birth = new Date(birthString)
  let birthYear = birth.getFullYear()
  let birthMonth = birth.getMonth()
  let birthDay = birth.getDate()

  let nowYear = now.getFullYear()
  let nowMonth = now.getMonth()
  let nowDay = now.getDate()

  let yearDiff = nowYear - birthYear // 相差年份
  if (yearDiff <= 0) {
    age = 0 // 同年 则为0岁
  } else {
    age = yearDiff - 1 // 相差年份-1
    if (nowMonth > birthMonth) {
      age++
    } else if (nowMonth === birthMonth) {
      if (nowDay >= birthDay) {
        age++
      }
    } else {
      // 月份少于生日月份，则不增加岁数
    }
  }
  return isNaN(age) ? '' : age
}
/**
 * @title 获取IE版本
 * @return number IE的版本 -1 非IE  'edge' edge浏览器 number IE对应的版本
 */
const IEVersion = () => {
  var userAgent = navigator.userAgent //取得浏览器的userAgent字符串
  var isIE =
    userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 //判断是否IE<11浏览器
  var isEdge = userAgent.indexOf('Edge') > -1 && !isIE //判断是否IE的Edge浏览器
  var isIE11 =
    userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
  if (isIE) {
    var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
    reIE.test(userAgent)
    var fIEVersion = parseFloat(RegExp['$1'])
    if (fIEVersion == 7) {
      return 7
    } else if (fIEVersion == 8) {
      return 8
    } else if (fIEVersion == 9) {
      return 9
    } else if (fIEVersion == 10) {
      return 10
    } else {
      return 6 //IE版本<=7
    }
  } else if (isEdge) {
    return 'edge' //edge
  } else if (isIE11) {
    return 11 //IE11
  } else {
    return -1 //不是ie浏览器
  }
}
export {
  arrFloat,
  getQueryString,
  preventXSS,
  js_getDPI,
  checkEmpty,
  checkPwdLevel,
  arrDelRepeat,
  RandomNum,
  DataType,
  isEmptyObject,
  confusedArr,
  getAge,
  IEVersion
}
