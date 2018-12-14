var $sql = require('../db/sqlMap');
var moment = require('moment')

var insertReserverInfo = function(conn,data){
  var sql = $sql.reserver.insert;
  var reserver_time = moment(data.reserver_time).format('YYYY-MM-DD HH:mm:ss');
  var fields = [data.openid,data.user_name,data.user_phone,reserver_time];
  conn.query(sql,fields,function (err, result) {
    if (err){
      console.log('[INSERT ERRO]-'+err);
    }
    return;
  });
}


module.exports = {
  insertReserverInfo
}
