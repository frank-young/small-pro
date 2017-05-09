import Config from '../../utils/config.js'

Page({
  data: {
    src: 'http://frank.s1.natapp.link/qrcode.jpg'
  },
  onLoad () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: Config.host + 'match',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success: function(res){
        that.setData({
          matchInfo: res.data.bizContent
        })
        wx.hideLoading()
      }
    })
  },
  copyWxid () {
    let that = this
    wx.setClipboardData({
      data: that.data.matchInfo.wechat_id,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },
  gowx () {
    let that = this
    wx.previewImage({
      urls: [that.data.src]
    })
  }
})
