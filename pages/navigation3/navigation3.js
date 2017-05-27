Page({
  data: {
    placeholderText: "连接服务器中...",
    messageArray: [],
    socketOpen: false,
    inputValue: ""
  },
  onLoad: function (options) {
    var self = this;
    console.log("将要连接服务器。");
    wx.connectSocket({
      url: 'ws://localhost:8080'
    });

    wx.onSocketOpen(function (res) {
      console.log("连接服务器成功。");
      self.setData({
        placeholderText: "连接服务器成功，请输入姓名。",
        socketOpen: true
      });
    });

    wx.onSocketMessage(function (res) {
      console.log('收到服务器内容：' + res.data);
      var data = res.data;
      var dataArray = data.split("_");
      var newMessage = {
        type: dataArray[0],
        name: dataArray[1],
        time: dataArray[2],
        message: dataArray[3]
      };
      var newArray = self.data.messageArray.concat(newMessage);
      self.setData({
        messageArray: newArray,
        placeholderText: "请输入信息"
      });
    });
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '聊天室'
    })
  },

  onUnload: function () {
    wx.closeSocket();
  },

  bindKeyInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    });
  },

  send: function () {
    if (this.data.inputValue != "") {
      this.sendSocketMessage(this.data.inputValue);
      this.setData({
        inputValue: ""
      });
    }
  },

  sendSocketMessage: function (msg) {
    if (this.data.socketOpen) {
      wx.sendSocketMessage({
        data: msg
      })
    }
  }
});



/*
// pages/navigation3/navigation3.js
Page({
  data:{
    imgSrc:""
  },
  uploadImg:function(){

    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths

        wx.uploadFile({
            url: 'https://mongo37.applinzi.com/upload_handle.php',
            filePath: tempFilePaths[0],
            name: 'fileup',
            success: function(res){
              var data = res.data;
              //console.log(data)
            },
            fail:function(){
              console.log('fail');
            }
          });


      }
    })
  },
  downImg:function(){
    var that=this;
    wx.downloadFile({
          url: "https://mongo37.applinzi.com/about.png",

          success: function(res){
              console.log(res.tempFilePath);
              that.setData({
                imgSrc:res.tempFilePath
              });
          },
          fail: function(res) {
           console.log('下载失败');
          },
          complete: function(res) {
            // complete
          }
        })
  }
})
 */





// pages/navigation3/navigation3.js
/*Page({
  data:{
    imgSrc:""
  },
  uploadImg:function(){

    var that=this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths

        wx.uploadFile({
            url: 'https://mongo37.applinzi.com/upload_handle.php',
            filePath: tempFilePaths[0],
            name: 'fileup',
            success: function(res){
              var data = res.data;
              //console.log(data)
            },
            fail:function(){
              console.log('fail');
            }
          });


      }
    })
  },
  downImg:function(){
    var that=this;
    wx.downloadFile({
          url: "https://mongo37.applinzi.com/about.png",

          success: function(res){
              console.log(res.tempFilePath);
              that.setData({
                imgSrc:res.tempFilePath
              });
          },
          fail: function(res) {
           console.log('下载失败');
          },
          complete: function(res) {
            // complete
          }
        })
  }
})*/