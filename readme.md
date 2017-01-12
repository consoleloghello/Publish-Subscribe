###/*
###*本例子摘自《javascript设计模式与开发实践》-曾探。（发布-订阅模式）
###*比如要开发一个网站登录后刷新列表，头像，购物车，nav等的功能
###*没有发布-订阅模式之前的代码是这样的
###*/
###login.succ(function(data){
###    header.setAvatar( data.avatar );    //设置登陆后的头像
###    nav.setAvatar( data.avatar );       //设置登陆后nav模块的头像
###    message.refresh();                  //刷新消息列表
###    cart.refresh();                     //刷新购物车列表
###});
###/*
###*显然，要增加新功能只能往回调函数里堆代码，不利于维护
###*/



/*
*利用发布-订阅模式开发
*/
$.ajax('http:xxx.com?login', function(data){        //登陆成功
    login.trigger( "loginSucc", data );             //发布登陆成功的消息
});

//各模块监听登陆成功的消息：
var header = (function(){           //header模块
    login.listen("loginSucc", function( data ){
        header.setAvatar( data.avatar );
    });
    return {
        setAvatar:function( data ){
            console.log("设置header模块的头像");
        }
    }
})();
var nav = (function(){              //nav模块
    login.listen("loginSucc", function( data ){
        nav.setAvatar( data.avatar );
    });
    return {
        setAvatar:function( data ){
            console.log("设置nav模块的头像");
        }
    }
})();

/*过了很久之后，又增加了登陆后刷新收货地址列表的功能
* 那么只要在收货地址模块里增加监听消息的方法就可以了，
* 作为登陆模块的开发者，就不需要再关心这些行为了
*/
var address = (function(){                      //刷新收货地址列表模块
    login.listen("loginSucc", function( obj ){
        address.refresh( obj );
    });
    return {
        refresh: function( avatar ){
            console.log("刷新收货地址列表");
        }
    }
})();
