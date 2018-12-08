var axios = require('axios');

var createMenuUrl = 'https://api.weixin.qq.com/cgi-bin/menu/create';

function createMenu(access_token){
    var menu = {
        "button" : [
            {
                "name" : "我要预约",
                "sub_button" :[
                    {
                        "type" : "view",
                        "name" : "预约到店",
                        "url"  : "http://47.110.90.203/arriveReserver"
                    },
                    {
                        "type" : "click",
                        "name" : "关于预约",
                        "key" : "V1001"
                    }
                ]
            },
            {
                "name" : "信息查询",
                "sub_button" : [
                    {
                        "type" : "click",
                        "name" : "信息下载",
                        "key"  : "V2001"
                    }
                ]
            },
            {
                "name" : "关于我们",
                "sub_button" : [
                    {
                        "type" : "click",
                        "name" : "我们的故事",
                        "key"  : "V3001"
                    }
                ]
            }
        ]
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