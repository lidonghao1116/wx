//aboutme.js
//获取应用实例
var app = getApp()
Page({
  data: {
    toastHidden: true,
    info: {}
  },

  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/NewsMsg/NewsMsg/getDetail',
      data: { id:options.id },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        
          that.setData({ info:res.data })
      },

    })
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '资讯详情'
    })
  },
  closepage: function () {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function (res) {
        // success
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
})