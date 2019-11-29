/**
 * @title  基础的校验函数
 * @params value:传入的值  type: 检查的类型
 * @retrun type Promise(可进行链式调用) value:{0:'不正确','1':'正确','2':'value为空','3':'类型为空'}
 * @desc   type的枚举 IP: ip地址  IdNo：身份证号码  eMail:又想验证 url：'合法url地址' ,isUpper:'大小写',isChinese:''是否为中文
 */

const baseValidate = async function(value, type) {
  if (value === '' || value === undefined || value === null) {
    return '2'
  } else {
    const valiDateReg = {
      IP: /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/,
      IdNo: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,
      eMail: /^([a-zA-Z0-9]+[-_\.]?)+@[a-zA-Z0-9]+\.[a-z]+$/,
      url: /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/,
      isUpper: /^[A-Z]+$/,
      isChinese: /^[\u0391-\uFFE5A-Za-z]+$/
    }
    const reg = valiDateReg[type]
    return reg ? (!reg.test(value) && value != '' ? '0' : '1') : '3'
  }
}

export { baseValidate }
