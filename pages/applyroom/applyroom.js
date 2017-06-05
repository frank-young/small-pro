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
      success (res) {
        if (res.data.success) {
          that.setData({
            applyroom: res.data.bizContent
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
        name = event.detail.value.name,
        phone = event.detail.value.phone,
        wx_id = event.detail.value.wx_id,
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
        wx_id,
        content
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          wx.showModal({
            title: '申请成功👌',
            showCancel: false,
            confirmText: '知道啦',
            confirmColor: '#f8614a',
            content: '你的房主申请已经提交成功，我们会进行审核，审核通过将通过微信通知你',
            success () {
              wx.navigateBack({
                delta: 1
              })
            }
          })
        }
      },
      complete () {
        wx.hideLoading()
      }
    })
  },
  back () {
    wx.navigateBack({
      delta: 1
    })
  }
})
