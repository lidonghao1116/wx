//app.js
App({
  openid:null,
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    wx.login({
      success: function (res) {
        console.log(res.code);
        wx.request({
          url: 'https://mongo37.applinzi.com/code.php',
          data: { code: res.code },
          method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
          // header: {}, // 设置请求的 header
          success: function (res) {
            var data = res.data;
            var openid = data.openid;
            that.openid = openid;
            //console.log(res.data);
          }
        })
      },
      fail: function (res) {
        console.log("fail");
      },
      complete: function (res) {
        // complete
      }
    })
  
  
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  success:function(res){
    if(res.code){
         wx.request({
            url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/sendCode', //仅为示例，并非真实的接口地址
            data: {
              code: res.code ,
              PHPSESSID :wx.getStorageSync('PHPSESSID') 
            },
         success: function(res) {
              //缓存sessionID
              wx.setStorageSync('PHPSESSID', res.data.PHPSESSID)
              wx.setStorageSync('openid', res.data.openid)
            }
          })
    }
  },

  globalData:{
    userInfo:null
  }
})