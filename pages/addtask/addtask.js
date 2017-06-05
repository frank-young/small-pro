import Config from '../../utils/config.js'
import QiniuUploader from '../../utils/qiniuUploader.js'

Page({
  data: {
  },
  onLoad () {

  },
  submit (event) {
    let that = this,
        title = event.detail.value.title,
        num = event.detail.value.num,
        body = event.detail.value.body
    wx.showLoading({
      title: '操作中'
    })
    wx.request({
      url: Config.host + 'taskmanager/create',
      data: {
        session_key: wx.getStorageSync('session_key'),
        title,
        num,
        body
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          wx.showToast({
            title: res.data.message,
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        }
      },
      complete () {
        wx.hideLoading()
      }
    })
  }
})
