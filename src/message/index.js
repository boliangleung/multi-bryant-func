let infor = function(text, callback) {
  var innerHtml =
    '<section id="messageInfor" style="position: fixed;top: 0;left: 0;height: 100vh;width: 100vw;background: rgba(0,0,0,0.3);z-index: 2000">' +
    '<div style="background: #FFFFFF;width: 70vw;position: absolute;top: 40%;left: 15%;transform: translateY(-50%);border-radius: 4px;padding: 24px">' +
    '<div style="font-weight: bold;font-size: 18px;margin-bottom: 16px;">提示</div>' +
    '<div style="margin-bottom: 16px;font-size: 16px">' +
    text +
    '</div>' +
    '<div  style="color: #08BAC6;text-align: right"><div id="messageClose" style="display: inline-block;font-size: 16px">确定</div></div>' +
    '</div>' +
    '</section>'
  document
    .getElementsByTagName('body')[0]
    .insertAdjacentHTML('afterbegin', innerHtml)
  document.getElementById('messageClose').addEventListener(
    'click',
    () => {
      document
        .getElementsByTagName('body')[0]
        .removeChild(document.getElementById('messageInfor'))
      typeof callback === 'function' && callback()
    },
    false
  )
}

let confirm = function(text, callback) {
  var innerHtml =
    '<section id="messageInfor" style="position: fixed;top: 0;left: 0;height: 100vh;width: 100vw;background: rgba(0,0,0,0.3);z-index: 2000">' +
    '<div style="background: #FFFFFF;width: 70vw;position: absolute;top: 40%;left: 15%;transform: translateY(-50%);border-radius: 4px;padding: 24px">' +
    '<div style="font-weight: bold;font-size: 18px;margin-bottom: 16px;">提示</div>' +
    '<div style="margin-bottom: 16px;font-size: 16px">' +
    text +
    '</div>' +
    '<div style="text-align: right">' +
    '<div id="messageClose" style="display: inline-block; color: #7c7c7c; margin-right: 24px;font-size: 16px">取消</div>' +
    '<div id="messageConfirm" style="display: inline-block; color: #08BAC6;font-size: 16px">确定</div></div>' +
    '</div>' +
    '</section>'
  document
    .getElementsByTagName('body')[0]
    .insertAdjacentHTML('afterbegin', innerHtml)
  document.getElementById('messageClose').addEventListener(
    'click',
    () => {
      document
        .getElementsByTagName('body')[0]
        .removeChild(document.getElementById('messageInfor'))
    },
    false
  )
  document.getElementById('messageConfirm').addEventListener(
    'click',
    () => {
      document
        .getElementsByTagName('body')[0]
        .removeChild(document.getElementById('messageInfor'))
      typeof callback === 'function' && callback()
    },
    false
  )
}

export default {
  infor,
  confirm
}
