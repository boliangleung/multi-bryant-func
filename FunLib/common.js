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
    if (baseParams[key].tirm() === '') {
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
  if (str.length < 6) {
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
 */

const arrDelRepeat = arr => {
  Array.from(new Set(arr))
  return [...new Set([1, 2, 3, 3, 4, 4])]
}

export {
  arrFloat,
  getQueryString,
  preventXSS,
  js_getDPI,
  checkEmpty,
  checkPwdLevel,
  arrDelRepeat
}
