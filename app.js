var express = require('express');
var mysql = require('mysql');
var axios = require('axios');
var WXBizMsgCrypt = require('wechat-crypto');
var crypto = require('crypto');
var menu = require('./menu');

var connection = mysql.createConnection({
    host : '47.110.90.203',
    database : 'wechat',
    user : 'root',
    password : 'Kimi-886',
    port : '3306'
});

connection.on('error', function(err) {
    console.log("[mysql error]",err);
});

var config = {
    token: 'helloToken',
    appid: 'wx16cbe02f1acf411e',
    secret: 'f7d67453e34f3c887e0685fe1ff6064d',
    encodingAESKey: 'UsuzoGJHj8W7MQXcFuYVMg0n88SwknAfA7OAwMAPJUh',
    checkSignature: true // 可选，默认为true。由于微信公众平台接口调试工具在明文模式下不发送签名，所以如要使用该测试工具，请将其设置为false
};

const app = express();

var access_token = null;
app.get('/wechat', (req,res)=>{
    console.log('start query');
    var cryptor = new WXBizMsgCrypt(config.token, config.encodingAESKey, config.appid);
    //tokenValidate();
    var sql = 'SELECT * FROM token limit 1';
    connection.query(sql,null,function(err,result){
        if (err){
            res.send(err);
        }
        if (result == '' || result == undefined || result == null || result.size == 0 || expireValidate(result[0])){
            var url = 'https://api.weixin.qq.com/cgi-bin/token';
            axios.get( url , {
                params:{
                    grant_type:'client_credential',
                    appid:config.appid,
                    secret:config.secret
                }
            }).then((userinfo)=>{
                var udata = userinfo.data;
                var sql = 'INSERT INTO token(access_token, expires_in, create_at) VALUES(?, ?, ?)';
                var fields = [udata.access_token,udata.expires_in,Date.now()];
                connection.query(sql, fields, function (err, result) {
                    if (err){
                        console.log('[INSERT ERRO]-'+err);
                    }
                    return;
                });
                access_token = udata.access_token;
                main(req,res);
            });
        }else{
            console.log('mysql query success');
            access_token = result[0].access_token;
            main(req,res);
        }
    })
});

app.get('/reserverView',function(req,res){
    res.send('reserverView');
});

var main = function(req,res){
    console.info('main function access_token='+access_token);
    menu.createMenu(access_token);
    res.send('success');
}

var tokenValidate = function(){
    var signature = req.query.signature;
    var timestamp = req.query.timestamp;
    var nonce = req.query.nonce;
    var echostr = req.query.echostr;
    var str = [config.token, timestamp, nonce].sort().join('');
    var sha = sha1(str)
    if (sha === signature) {
        res.send(echostr + '');
    } else {
        res.send('');
    }
}

var expireValidate = function(tokenData){
    if (tokenData == undefined || tokenData == null){
        return true;
    }
    var create_at = tokenData.create_at;
    var expires_in = tokenData.expires_in;
    var expireTime = create_at+expires_in*1000;
    var now = Date.now();
    if (now<expireTime){
        connection.query('delete from token',null,function (err,result) {
            if (err){
                console.log('[DELETE ERRO]-'+err);
            }
            return;
        });
        return true
    }else{
        return false;
    }
}

var sha1 = function (str){
    var shasum = crypto.createHash('sha1');
    return shasum.update(str).digest('hex');
}


app.listen(80, () => console.log('Example app listening on port 80!'));