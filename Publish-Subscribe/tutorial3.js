/*
*发布-订阅模式，版本三 version 0.3
*发布-订阅模式的通用实现
*/

//把发布-订阅的功能单独提取出来，放在一个单独的对象中：
var event = {
    clientList : [],
    listen:function( key, fn ){
        if( !this.clientList[ key ] ){
            this.clientList[ key ] = [];
        }
        this.clientList[ key ].push( fn );              //订阅的消息添加进缓存列表
    },
    trigger:function(){
        var key = Array.prototype.shift.call( arguments ),
            fns = this.clientList[ key ];
        if( !fns || fns.length === 0 ){                 //如果没有绑定对应的消息
            return false;
        }
        for( var i = 0, fn; fn = fns[ i++ ]; ){
            fn.apply( this, arguments );                //arguments是trigger时带上的参数
        }
    },
    remove:function( key, fn ){
        var fns = this.clientList[ key ];
        if( !fns ){                                     //如果key对应的消息没有被人订阅，则直接返回
            return false;
        }
        if( !fn ){                                      //如果没有传入具体的回调函数，表示需要取消key对应消息的所有订阅
            fns && ( fns.length = 0 );
        }else{
            for( var l = fns.length - 1; l >= 0; l-- ){ //反向遍历订阅的回调函数列表
                var _fn = fns[l];
                if( _fn === fn ){
                    fns.splice(l, 1);                   //删除订阅者的回调函数
                }
            }
        }
    }
}
//再定义一个installEvent函数，这个函数可以给所有的对象动态安装发布-订阅功能：
var installEvent = function( obj ){
    for( var i in event ){
        obj[ i ] = event[ i ];
    }
}





var salesOffices = {};
installEvent( salesOffices );

//订阅消息
salesOffices.listen("squareMeter88", fn1 = function( price ){     //小明订阅88平方米房子的消息
    console.log("价格 = " + price );
});

salesOffices.listen("squareMeter88", fn2 = function( price ){     //小红订阅110平方米房子的消息
    console.log("价格 = " + price );
});

salesOffices.remove("squareMeter88", fn1);                         //删除小明的订阅

//发布消息
salesOffices.trigger( "squareMeter88", 2000000 );        //输出2000000

/*
*现在有点像 addEventListener 的味道了....
*/
