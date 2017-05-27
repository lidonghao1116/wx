var app = getApp()


Page({
  data: {
    date: "2017-05-17"
  },


  formSubmit: function (e) {
    console.log(e);
    var formId = e.detail.formId;
    var values = e.detail.value;
    var site = values.site;
    var name = values.name;
    var date = values.date;
    var openid = app.openid;
    console.log(openid);
    wx.request({
      url: 'https://mongo37.applinzi.com/muban.php',
      data: {
        formId: formId,
        site: site,
        openid: openid,
        date: date,
        name: name,

      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data)
      }
    })


  },
  bindDateChange: function (e) {
    console.log(e);
    this.setData(
      { date: e.detail.value }
    )
  },
  bindTimeChange: function (e) {
    console.log(e);
    this.setData(
      { data: e.detail.value }
    )
  }
})