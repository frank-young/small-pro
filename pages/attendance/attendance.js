let app = getApp()
Page({
  data: {
    isDisabled: true
  },
  bindViewTap () {
  },
  onLoad () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  switchChange (e) {
    e.detail.value == true ? this.setData({isDisabled: false}) : this.setData({isDisabled: true})
  },
  agreeBtn (e) {
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
})
