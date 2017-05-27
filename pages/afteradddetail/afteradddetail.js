// pages/detail/detail.js
Page({
  data: {
    info: {},
    numberzan: 0,
    numberping: 0,
    placeholderText: "连接服务器中...",
    messageArray: [],
    socketOpen: false,
    inputValue: "",
    array: ['中国', '巴基斯坦', '俄罗斯', '古巴'],
    area: 0,
    score: 0,
    is_dev: 0,
    url: "../../../images/14.png"



  },
  onLoad: function (options) {
    var that = this
    var key = 'info_' + options.id
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/AllClass/AllClass/getDetail',
      data: { id: options.id },
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({ info: res.data })
        console.log(key)
        wx.setStorageSync(key, res.data)
        console.log('url')
      },
      fail: function (res) {
        console.log('fail:123')
        var info = wx.getStorageSync(key)
        if (info) {
          that.setData({ info: info })
          console.log('cachequde')
        }
      }
    　　　　})



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
  //原来的
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
  //原来的结束


  //新的
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
  },
  //新的结束




  //作业的JS

  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formData = e.detail.value
    formData.area = this.data.area
    formData.score = this.data.score

    var that = this
    wx.request({

      url: 'http://localhost/weicms/index.php?s=/addon/Feedback/Feedback/addFeedback',
      data: formData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })


  },

  bindPickerChange: function (e) {
    console.log('form发生了picker事件，携带数据为：', e.detail.value)
    this.setData({ area: e.detail.value });
  },
  bindSliderChange: function (e) {
    console.log('form发生了Slider事件，携带数据为：', e.detail.value)
    this.setData({ score: e.detail.value });
  },
  //作业JS结束



  /*点赞和评论*/

  add: function (e) {

    this.setData({
      numberzan: this.data.numberzan + 1,
      url: "../../../images/20.png"
    })
  },
  add2: function (e) {

    this.setData({
      numberping: this.data.numberping + 1,
    })
  }

})