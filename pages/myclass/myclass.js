// pages/navigations/index.js
Page({
  data: {
    newsList: [],
    lastid: 0,
    toastHidden: true,
    confirmHidden: false,
    msg: '没有更多课程了',

    imgUrls: [
      {
        url: '../../../images/1.jpg'
      }, {
        url: '../../../images/2.jpg'
      }, {
        url: '../../../images/3.jpg'
      }
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    userInfo: {}
  },
  loadData: function (lastid) {
    var limit = 2
    var that = this
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getList',
      data: { lastid: lastid, limit: limit },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (!res.data) {
          that.setData({ toastHidden: false })
          return false
        }

        var len = res.data.length

        that.setData({ lastid: res.data[len - 1].id })


        var dataArr = that.data.newsList
        var oldLastid = lastid
        var newData = dataArr.concat(res.data);

        if (oldLastid == 0) {
          wx.setStorageSync('CmsList', newData)
        }

        that.setData({ newsList: newData })
        console.log('fuwuqiquzhi')
      },
      fail: function (res) {
        console.log('fail:123')
        if (lastid == 0) {
          var newData = wx.getStorageSync('CmsList')
          that.setData({ newsList: newData })

          var len = newData.length
          that.setData({ lastid: newData[len - 1].id })



          console.log('cachequde')

        }
      }
    　　　　})
  },

  loadMore: function (event) {
    var that = this
    var id = event.currentTarget.dataset.lastid
    this.loadData(id);

    wx.getNetworkType({
      success: function (res) {
        var networkType = res.networkType
        if (networkType != 'wifi') {
          that.setData({ confirmHidden: false })
        }
      }
    })
  },
  onLoad: function (options) {
    var that = this
    this.loadData(0);

  },
  toastChange: function () {
    this.setData({ toastHidden: true })
  },
  modalChange: function () {
    this.setData({ confirmHidden: true })
    console.log("abc");
  },
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的课程'
    })
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})