var $sql = require('../db/sqlMap');

var deleteExpireToken = function(conn,result){
  if(result){
    console.log('start delete toekn');
    conn.query($sql.token.delete,function(err,result){
        if (err){
          console.log('[DELETE ERRO]-'+err);
        }
        return;
    });
  }
}

var saveToken = function(conn,data){
  var sql = $sql.token.insert;
  var fields = [data.access_token,data.expires_in];
  conn.query(sql, fields, function (err, result) {
    if (err){
      console.log('[INSERT ERRO]-'+err);
    }
    return;
  });
}

module.exports = {
    deleteExpireToken,
    saveToken
}
