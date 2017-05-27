// pages/navigation1/navigation1.js
Page({
  data:{
     array: ['中国', '巴基斯坦', '俄罗斯', '古巴'],
    area: 0,
    score:0,
    is_dev:0
   
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    wx.setNavigationBarTitle({
      title: '我的作业',
      success: function(res) {
        // success
      }
    })
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  formSubmit:function(e){
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
     var formData= e.detail.value
     formData.area=this.data.area
     formData.score=this.data.score
    console.log(formData)
     var that =this
      wx.request({

 　　　　 url: 'http://localhost/weicms/index.php?s=/addon/Feedback/Feedback/addFeedback',
  　　　　data: formData,
 　　　　 header: {
    　　  'content-type': 'application/json'
 　　　　　 },
 　　　　 success: function(res) {
            console.log(res)
 　　　　　 }
　　　　}) 


  },
  bindPickerChange:function(e){
    console.log('form发生了picker事件，携带数据为：', e.detail.value)
    this.setData({area:e.detail.value});
  },
  bindSliderChange:function(e){
    console.log('form发生了Slider事件，携带数据为：', e.detail.value)
     this.setData({score:e.detail.value});
  }

})