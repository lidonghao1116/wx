// pages/choosepro/choosepro.js
Page({

  data: {
    hiddenToast:true
  },

  onLoad: function (options) {
  
  },

  listenerButton: function () {
    this.setData({
      hiddenToast: !this.data.hiddenToast
    })
  },

  toastHidden: function () {
    this.setData({
      hiddenToast: true
    })
  },
  derect:function(){
     wx.redirectTo({
       url: '../../../pages/allclass/allclass',
     })
  }

})