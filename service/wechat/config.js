module.exports = {
  config : {
    token: 'helloToken',
    appid: 'wx16cbe02f1acf411e',
    secret: 'f7d67453e34f3c887e0685fe1ff6064d',
    encodingAESKey: 'UsuzoGJHj8W7MQXcFuYVMg0n88SwknAfA7OAwMAPJUh',
    checkSignature: true ,// 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
    tokenUrl: 'https://api.weixin.qq.com/cgi-bin/token',
    createMenuUrl : 'https://api.weixin.qq.com/cgi-bin/menu/create'
  }
}
