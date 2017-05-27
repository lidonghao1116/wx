//index.js
//获取应用实例
var app = getApp();
var calendarSignData;
var date;
var calendarSignDay;
var calendarSignDay;
Page({

  data: {
    lastid: 0,
    lastid2: 0,
    inputVal: '',
    msgData: [],
    storageContent: '',
    storageSyncContent: '',
  },



  //事件处理函数
  calendarSign: function () {
    calendarSignData[date] = date;
    console.log(calendarSignData);
    calendarSignDay = calendarSignDay + 1;
    wx.setStorageSync("calendarSignData", calendarSignData);
    wx.setStorageSync("calendarSignDay", calendarSignDay);

    wx.showToast({
      title: '签到成功',
      icon: 'success',
      duration: 2000
    })
    this.setData({

      calendarSignData: calendarSignData,
      calendarSignDay: calendarSignDay
    })
  },
  onLoad: function (options) {
    var that = this
    this.loadData(0);
    this.loadData2(0);
    var mydate = new Date();
    var year = mydate.getFullYear();
    var month = mydate.getMonth() + 1;
   
    wx.setStorage({
      key: "key",
      data: this.data.msgData
    })


   
    date = mydate.getDate();
    console.log("date" + date)
    var day = mydate.getDay();
    console.log(day)
    var nbsp;
    if ((date - day) <= 0) {
      nbsp = day - date + 1;
      console.log(111111)
    } else {
      console.log(33333333)
      nbsp = 7 - ((date - day) % 7) + 1;
    }
    console.log("nbsp" + nbsp);
    var monthDaySize;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
      monthDaySize = 31;
    } else if (month == 4 || month == 6 || month == 9 || month == 11) {
      monthDaySize = 30;
    } else if (month == 2) {
      // 计算是否是闰年,如果是二月份则是29天
      if ((year - 2000) % 4 == 0) {
        monthDaySize = 29;
      } else {
        monthDaySize = 28;
      }
    };
    // 判断是否签到过
    if (wx.getStorageSync("calendarSignData") == null || wx.getStorageSync("calendarSignData") == '') {
      wx.setStorageSync("calendarSignData", new Array(monthDaySize));
    };
    if (wx.getStorageSync("calendarSignDay") == null || wx.getStorageSync("calendarSignDay") == '') {
      wx.setStorageSync("calendarSignDay", 0);
    }
    calendarSignData = wx.getStorageSync("calendarSignData")
    calendarSignDay = wx.getStorageSync("calendarSignDay")
    console.log(calendarSignData);
    console.log(calendarSignDay)
    this.setData({
      year: year,
      month: month,
      nbsp: nbsp,
      monthDaySize: monthDaySize,
      date: date,
      calendarSignData: calendarSignData,
      calendarSignDay: calendarSignDay
    })
  },


  loadData: function (lastid) {
    var limit = 2
    var that = this
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Feedback/Feedback/getList',
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

      },
    　　　　})
  },




  loadData2: function (lastid2) {
    var limit = 2
    var that = this
    wx.request({
      url: 'http://localhost/weicms/index.php?s=/addon/Cms/Cms/getList',
      data: { lastid2: lastid2, limit: limit },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (!res.data) {
          that.setData({ toastHidden: false })
          return false
        }

        var len = res.data.length

        that.setData({ lastid2: res.data[len - 1].id })
      },
    　　　　})
  },

  



  changeInputVal(ev) {
    this.setData({
      inputVal: ev.detail.value
    });
  },
  delMsg(ev) {
    var n = ev.target.dataset.index;
    var list = this.data.msgData;
    list.splice(n, 1);
    this.setData({
      msgData: list
    });
  },
  addMsg() {

    var list = this.data.msgData;
    list.push({
      msg: this.data.inputVal
    });
    //更新数据
    this.setData({
      msgData: list,
      inputVal: ''
    });
  },
  formSubmit: function (e) {
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
    var formData = e.detail.value
    formData.area = this.data.area
    formData.score = this.data.score

    var that = this
    wx.request({

      url: 'http://localhost/weicms/index.php?s=/addon/Leave/Leave/addFeedback',
      data: formData,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res)
      }
    })


  },
 

})
