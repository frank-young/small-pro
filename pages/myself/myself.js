import Config from '../../utils/config.js'
var app = getApp()

Page({
  data: {
    role: 'USER'
  },
  onLoad () {
    var that = this
    this.getRole()
    app.getUserInfo(function(userInfo){
      that.setData({
        userInfo:userInfo
      })
    })
  },
  getRole () {
    let that = this
    wx.request({
      url: Config.host + 'admin/role',
      method: 'POST',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            role: res.data.bizContent
          })
        }
      }
    })
  }
})
