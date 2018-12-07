var express = require('express');
var wechat = require('wechat');
var mysql = require('mysql');
var axios = require('axios');

var connection = mysql.createConnection({
    host : '47.110.90.203',
    user : 'root',
    password : 'Kimi-886',
    port : '3306'
});

var config = {
    token: 'helloToken',
    appid: 'wx16cbe02f1acf411e',
    secret: 'f7d67453e34f3c887e0685fe1ff6064d',
    encodingAESKey: 'UsuzoGJHj8W7MQXcFuYVMg0n88SwknAfA7OAwMAPJUh',
    checkSignature: false // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

const app = express()
var access_token = null;
app.use(express.query());
app.use('/wechat', wechat(config, function (req, res, next) {
    if (access_token == null){
        access_token = getToken(config);
    }
    main();
}));

var main = function(){
    console.info('main function')
}


var queryToken = function(config){
    console.log('start queryToken');
    var tokenUrl = 'https://api.weixin.qq.com/cgi-bin/token';
    axios.get(tokenUrl,{
        params:{
            grant_type:'client_credential',
            appid:config.appid,
            secret:config.secret
        }
    }).then((userinfo)=>{
        console.log('userinfo.data.access_token:'+userinfo.data.access_token);
        var access_token = userinfo.data.access_token ;
        saveToken(userinfo.data);
    });
}

var getToken = function(config){
    console.log('start getToken');
    var sql = 'SELECT * FROM token WHERE openid = ?';
    connection.query(sql, null, function (err, result) {
        if(err) {
            return console.error('err:'+err);
        }
        if (result==null || result.size==0){
            queryToken(config)
        }
        access_token = result[0];
    });
}

var saveToken = function(token){
    console.log('start saveToken');
    var sql = 'REPLACE INTO token(access_token, expires_in, create_at) VALUES(?, ?, ?)';
    var fields = [token.access_token, token.expires_in, Date.now()];
    connection.query(sql, fields, function (err, result) {
        if (err){
            return console.error(err);
        }
        access_token = result[0];
        main();
    });
}



app.listen(3000, () => console.log('Example app listening on port 80!'));