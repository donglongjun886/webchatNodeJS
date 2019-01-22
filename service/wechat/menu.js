var axios = require('axios');
var $wechatConfig = require('../wechat/config');

function createMenu(access_token){
    var menu = {
        "button" : [
            {
                "name" : "我要预约",
                "sub_button" :[
                    {
                        "type" : "view",
                        "name" : "预约到店",
                        "url"  : "http://www.291095.cn:8080/"
                    }
                ]
            }
        ]
    }
    var url = $wechatConfig.config.createMenuUrl + '?access_token='+access_token;
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
