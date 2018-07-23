(function (countlyTokenManager, $) {
    //we will store our data here
    var _data = {};
    //Initializing model
    countlyTokenManager.initialize = function () {
        //returning promise
        return $.ajax({
            type:"GET",
            url: countlyCommon.API_URL + "/o/token/",
            data:{
                //providing current user's api key
                "api_key":countlyGlobal.member.api_key
            },
            success:function (json) {
                //got our data, let's store it
                _data = json['result'];
            },
            error:function(exception){}
        });
    };
    //return data that we have
    countlyTokenManager.getData = function () {
        return _data;
    }; 
    
    countlyTokenManager.createToken = function (purpose,endpoint,multi,apps,ttl,callback) {
        return $.ajax({
            type:"GET",
            url: countlyCommon.API_URL + "/i/token/",
            data:{
                //providing current user's api key
                "api_key":countlyGlobal.member.api_key,
                "purpose":purpose,
                "endpoint":endpoint,
                "multi":multi,
                "apps":apps,
                "ttl":ttl
            },
            success:function (json) {
                //token created
                callback(true,json);
            },
            error:function(exception){ callback(false)}
        });
    }; 
    countlyTokenManager.deleteToken = function (id,callback) {
        return $.ajax({
            type:"GET",
            url: countlyCommon.API_URL + "/i/token/delete",
            data:{
                //providing current user's api key
                "api_key":countlyGlobal.member.api_key,
                "tokenid":id
            },
            success:function (json) {
               callback(true);
            },
            error:function(exception){ callback(false);}
        });
    }; 
    
}(window.countlyTokenManager = window.countlyTokenManager || {}, jQuery));
