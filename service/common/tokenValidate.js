var expireValidate = function(tokenData){
    if (tokenData == undefined || tokenData == null){
        return true;
    }
    var create_at = tokenData.create_at;
    var expires_in = tokenData.expires_in;
    var expireTime = new Date(create_at+expires_in*1000);
    var now = new Date();
    if (now>expireTime){
        return true
    }else{
        return false;
    }
}

exports.expireValidate = expireValidate;
