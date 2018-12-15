var express = require('express');
var router = express.Router();
var models = require('../db/db');
var mysql = require('mysql');
var $sql = require('../db/sqlMap');
var tokenValidate = require('../common/tokenValidate');
var $wechatConfig = require('../wechat/config');
var axios = require('axios');
var menu = require('../wechat/menu');
var token = require('../wechat/token');
var reserver = require('../wechat/reserver');

var conn = mysql.createConnection(models.mysql);

var access_token = null;

router.get('/',(req,res) => {
  console.log('start query');
  console.log('req.query=');
  console.log(req.query);
  console.log('req.body=');
  console.log(req.body);
  var selectSql = $sql.token.select;
  var hasCreateMenu =false;
  conn.query(selectSql,null,function(err,result){
    if (err) {
      console.log(err);
    }
    // 查询不到token或者token过期
    if (result == undefined || result == null || result.size == 0 || tokenValidate.expireValidate(result[0])){
      console.log('expire');
      // 删除原有token
      token.deleteExpireToken(conn,result);
      // 查询token
      axios.get($wechatConfig.config.tokenUrl,{
        params:{
          grant_type:'client_credential',
          appid:$wechatConfig.config.appid,
          secret:$wechatConfig.config.secret
        }
      }).then((userinfo)=>{
          var data = userinfo.data;
          // 保存token
          token.saveToken(conn,data);
          access_token = data.access_token;
          if (access_token || !hasCreateMenu) {
            menu.createMenu(access_token);
            hasCreateMenu = true;
          }
          return;
      });
    }else{
      console.log('mysql query success');
      access_token = result[0].access_token;
    }
    if (access_token || !hasCreateMenu) {
      menu.createMenu(access_token);
      hasCreateMenu = true;
    }
    res.send('success');
  })
});

router.post('/api/reserver',(req,res) => {
  console.log('/api/reserver params=');
  var params = req.body;
  console.log(params);
  reserver.insertReserverInfo(conn,params);
  res.send('预约成功');
})


module.exports = router;
