/*
*发布-订阅模式，版本一 version 0.1
*/

//code
var salesOffices = {};                  //定义售楼处

salesOffices.clientList = [];           //缓存列表，存放订阅者的回调函数

salesOffices.listen = function( fn ){   //增加订阅者
    this.clientList.push( fn );         //订阅消息添加进缓存列表
}

salesOffices.trigger = function(){      //发布消息
    for(var i = 0, fn; fn = this.clientList[i++]; ){
        fn.apply(this, arguments);      //arguments 是发布消息是带上的参数
    }
}

//订阅消息
salesOffices.listen(function( price, squareMeter ){     //小明订阅消息
    console.log("价格 = " + price );
    console.log(" squareMeter = " + squareMeter );
});

salesOffices.listen(function( price, squareMeter ){     //小红订阅消息
    console.log("价格 = " + price );
    console.log(" squareMeter = " + squareMeter );
});

//发布消息
salesOffices.trigger( 2000000, 88 );        //输出：200万，88平方米
salesOffices.trigger( 3000000, 110 );       //输出：300万，110平方米
