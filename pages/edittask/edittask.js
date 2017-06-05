import Config from '../../utils/config.js'
import QiniuUploader from '../../utils/qiniuUploader.js'

Page({
  data: {
    id: null,
    task: {}
  },
  onLoad (options) {
    this.setData({
      id: options.id
    })
    this.getDefaultRoomInfo(options.id)
  },
  getDefaultRoomInfo (id) {
    let that = this
    wx.showLoading({
      title: '操作中'
    })
    wx.request({
      url: Config.host + 'taskmanager/show',
      method: 'POST',
      data: {
        session_key: wx.getStorageSync('session_key'),
        id
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            task: res.data.bizContent
          })
        }
      },
      complete () {
        wx.hideLoading()
      }
    })
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
      url: Config.host + 'taskmanager/update',
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: that.data.id,
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
