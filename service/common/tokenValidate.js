var expireValidate = function(tokenData){
    if (tokenData == undefined || tokenData == null){
        return true;
    }
    var create_at = tokenData.create_at;
    var expires_in = tokenData.expires_in;
    var expireTime = create_at+expires_in*1000;
    var now = Date.now();
    if (now<expireTime){
        return true
    }else{
        return false;
    }
}

exports.expireValidate = expireValidate;
