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
 */
const dateFormat = function(date, fmt) {
  if (!Date.prototype.Format) {
    Object.defineProperty(Date.prototype, 'Format', {
      enumerable: false,
      configurable: false,
      writable: false,
      value: function(fmt) {
        var f = fmt != null ? fmt : 'yyyy-MM-dd hh:mm:ss'
        var weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
        var o = {
          'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
          'M+': this.getMonth() + 1, // 月份
          'd+': this.getDate(), // 日
          'h+': this.getHours(), // 时
          'm+': this.getMinutes(), // 分
          's+': this.getSeconds(), // 秒
          W: weekList[this.getDay()],
          S: this.getMilliseconds() // 毫秒
        }
        if (/(y+)/.test(f)) {
          f = f.replace(
            RegExp.$1,
            (this.getFullYear() + '').substr(4 - RegExp.$1.length)
          )
        }
        for (var k in o) {
          if (new RegExp('(' + k + ')').test(f)) {
            f = f.replace(
              RegExp.$1,
              RegExp.$1.length === 1
                ? o[k]
                : ('00' + o[k]).substr(('' + o[k]).length)
            )
          }
        }
        return f
      }
    })
  }
  let d = Date.prototype.isPrototypeOf(date) ? date : new Date(Number(date))
  return d.Format(fmt)
}
/**
 * @title 金额转化成大写
 * @param {Number} number
 * @tips 当你得到了大写字母 你要加间距。你可以通过转化成数组再去for循环样式 或者用正则 用Number初始化数据
 * @example  moneyUpper(12.05).split('').reduce((a,b)=>{return a+`<div>${b}</div>`},'')
 */
const moneyUpper = num => {
  const chinaNum = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  const chinaUnit = ['分', '角', '元', '拾', '佰', '仟', '万', '拾', '佰', '仟']
  const resultList = []
  let priceStr = Number(num)
    .toFixed(2)
    .toString()
  let itemStr = ''
  for (var i = 0; i < priceStr.length; i++) {
    if (priceStr[i] != '.') {
      resultList.unshift(chinaNum[priceStr[i]])
    }
  }
  resultList.forEach(function(item, index) {
    itemStr = item + chinaUnit[index] + itemStr
  })
  return itemStr
}

/**
 * 把Number四舍五入为指定小数位数的数字字符串（解决原toFixed四舍五入问题）
 * @param {number} [len=0] 保留小数位数
 * @param {boolean} [round=true] 是否四舍五入（默认进行四舍五入）
 * @param {boolean} [padding=true] 有效数字不足预设小数位数时是否后补0（默认后补）如：_toFixed(1.1,3,true,true) = "1.100"  ;   _toFixed(1.1,3,true,false) = "1.1"
 * @returns {string}
 * @example _toFixed(1.335,2);
 */
const _toFixed = (num, len = 2, round = true, padding = true) => {
  num = Number(num)
  if (len < 0) {
    throw new RangeError('digits argument must be between 0 and 100')
  }
  let numStr = String(num), //数字转字符串
    pointIndex = numStr.indexOf('.'), //小数点下标
    preNumIndex = pointIndex + len + 1 //保留位后一位数字下标
  if (numStr.includes('e') || pointIndex === -1) {
    //遇到科学表示法或整数，直接返回原生toFixed处理结果
    return num.toFixed(len)
  }
  let addZeroCount = len - (numStr.length - pointIndex - 1) //需补0的个数
  if (addZeroCount > 0) {
    numStr += '0'.repeat(addZeroCount) //小数位不足后补0
  }
  let numCut = Math.abs(numStr.substring(0, preNumIndex)) //截取保留位（含）前的所有字符
  let res =
    (num < 0 ? '-' : '') +
    (round && numStr[preNumIndex] >= 5
      ? numCut + 1 / Math.pow(10, len)
      : numCut
    ).toFixed(len) //判断预期小数位后一位是否大于等于5，是则进位
  return padding ? res : String(Number(res))
}

/**
 * @title 脱敏身份证号，前四后三，中间有多少位就有多少个*
 * @param {String} idNum
 * @returns {String}
 */
const idNumberFormat = idNum => {
  if (typeof idNum !== 'string') {
    return ''
  }

  if (idNum.length < 7) {
    return idNum
  }

  let star = '*'.repeat(idNum.length - 7)
  let value = idNum.slice(0, 4) + star + idNum.slice(idNum.length - 3)
  return value
}

/**
 * @title 脱敏手机号码 前三后四 中间四个
 * @param {String} idNum
 * @returns {String}
 */
const phoneFormat = phone => {
  if (typeof phone !== 'string') {
    return ''
  }

  if (phone.length < 7) {
    return phone
  }

  let reg = /^(\d{3})[\s\S]+(\d{4})$/
  let value = phone.toString().replace(reg, '$1****$2')
  return value
}
/**
 * @title 金钱过滤器
 * 参数说明：
 * @param {Number|String} number：要格式化的数字
 * @param {Number|String} decimals：保留几位小数 默认值 2位小数
 * @param {String} dec_point：小数点符号    默认值 '.'
 * @param {String} thousands_sep：千分位符号  默认值  ','
 * @param {String} roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
 * @example moneyFormat(12345.5)  // 参数自己添加
 * */
const moneyFormat = (
  number,
  decimals = 2,
  dec_point = '.',
  thousands_sep = ',',
  roundtag
) => {
  number = (number + '').replace(/[^0-9+-Ee.]/g, '')
  roundtag = roundtag || 'ceil' //"ceil","floor","round"
  var n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
    sep = typeof thousands_sep === 'undefined' ? ',' : thousands_sep,
    dec = typeof dec_point === 'undefined' ? '.' : dec_point,
    s = '',
    toFixedFix = function(n, prec) {
      var k = Math.pow(10, prec)
      console.log()

      return (
        '' +
        parseFloat(
          Math[roundtag](parseFloat((n * k).toFixed(prec * 2))).toFixed(
            prec * 2
          )
        ) /
          k
      )
    }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  var re = /(-?\d+)(\d{3})/
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + sep + '$2')
  }

  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec)
}
export {
  dateFormat,
  moneyUpper,
  _toFixed,
  idNumberFormat,
  phoneFormat,
  moneyFormat
}
