import Config from '../../utils/config.js'

Page({
  data: {
    applyroom: {}
  },
  onLoad () {
    this.getApplyRoomStatus()
  },
  getApplyRoomStatus () {
    let that = this
    wx.showLoading({
      title: '加载中'
    })
    wx.request({
      url: Config.host + 'applyroom/status',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            applyroom: res.data.bizContent
          })
          wx.hideLoading()
        }
      }
    })
  },
  submit (event) {
    let that = this,
        name = event.detail.value.name,
        phone = event.detail.value.phone,
        content = event.detail.value.content
    wx.showLoading({
      title: '操作中'
    })
    wx.request({
      url: Config.host + 'applyroom/create',
      data: {
        session_key: wx.getStorageSync('session_key'),
        name,
        phone,
        content,
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
      }
    })
  },
  back () {
    wx.navigateBack({
      delta: 1
    })
  }
})
