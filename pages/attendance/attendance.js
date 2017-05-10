import Config from '../../utils/config.js'

const SUCCESS = true

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
    wx.showLoading({
      title: '操作中'
    })
    wx.request({
      url: Config.host + 'match/attendance',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success: function(res){
        if(res.data.success === SUCCESS) {
          wx.redirectTo({
            url: '../detail/detail'
          })
          wx.hideLoading()
        }
      }
    })
  }
})
