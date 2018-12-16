var excel = require('node-excel-export');
var $excelConfig = require('../config/excelConfig')
var format = require('date-format');
var $sql = require('../db/sqlMap');

const styles = $excelConfig.styles

const specification = {
  user_name : {
    displayName: '姓名',
    headerStyle: styles.headerDark,
    width:80
  },
  user_phone: {
    displayName: '手机号码',
    headerStyle: styles.headerDark,
    width:100
  },
  reserver_time: {
    displayName: '预约时间',
    headerStyle: styles.headerDark,
    width:150
  }
}


var exportReserverInfo = function(conn,res){
  conn.query($sql.reserver.select,null,function (err,result) {
    if (err){
      console.log('[SELECT ERRO]-'+err);
      return;
    }
    var dataset = [];
    result.forEach(item=>{
      var info = {
        'user_name' : item.user_name,
        'user_phone' : item.user_phone,
        'reserver_time' : format("yyyy-MM-dd hh:mm:ss",item.reserver_time)
      }
      dataset.push(info);
    });
    var report = excel.buildExport(
      [
        {
          name: '预约信息',
          specification: specification,
          data: dataset
        }
      ]
    );
    var excelName = '预约信息-'+ new Date().getTime()+ '.xlsx';
    res.attachment(excelName);
    return res.send(report);
  })
}

module.exports = {
  exportReserverInfo
}
