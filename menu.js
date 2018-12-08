var axios = require('axios');

var createMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create';

function createMenu(access_token){
    var menu = {
        "button" : [{
            "type" : "view",
            "name" : "预约",
            "url" : "http://47.110.90.203/reserverView"
        }]
    }
    var url = createMenuUrl + '?access_token='+access_token;
    axios.post( url ,menu,{
        headers:{
            'content-type':'application/x-www-form-urlencoded'
        }
    }).then(function(dt){
        console.log( '创建菜单请求已发出' , dt.data )

    });
    return;
}

module.exports = {
    createMenu
}