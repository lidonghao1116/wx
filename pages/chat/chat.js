var wsApi ="ws://192.168.1.104:3001"
var openBol=false;
Page({
  data: {
    text:"",
  },
  onLoad:function(){
    var that = this
    wx.connectSocket({
      url: wsApi,
      data: {},
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success:function(){
        console.log("客户端连接成功");
      }
    })
    wx.onSocketOpen(function(){
      console.log("websocket连接打开");
      openBol=true;
    });

    wx.onSocketMessage(function(msg){
      console.log(msg);
       that.setData({
         text:msg.data
         
         })
       
    })
  },

  sendMsg: function (e) {
      var that=this
      var val=e.detail.value
      if(openBol=true){
        wx.sendSocketMessage({data: e.detail.value}
        );

       that.setData({
         val:""
       }); 
       console.log(val);
      }
  
  },
  
  
})