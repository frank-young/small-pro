import Config from '../../utils/config.js'

Page({
  data: {
    motto: '还差一步',
    share: {
      title: '小呐一周CP，赶紧来参加！',
      desc: '小呐一周CP，独创的匹配算法，给你带来的幸福的体验',
      path: '/pages/index/index'
    },
    src: 'http://images.nanafly.com/images/share.jpg',
    isShow: false
  },
  shareTip () {
    let that = this
    this.setData({
      isShow: true
    })
    setTimeout(() => {
      that.setData({
        isShow: false
      })
    }, 5000)
  },
  onLoad () {
    wx.showShareMenu()
  },
  onShareAppMessage () {
    // 用户点击右上角分享
    return {
      title: this.data.share.title,
      path: this.data.share.path,
      success (res) {
        wx.request({
          url: Config.host + 'info/share',
          data: {
            session_key: wx.getStorageSync('session_key')
          },
          method: 'POST',
          header: {'content-type':'application/x-www-form-urlencoded'},
          success: function(res){
            if (res.data.success) {
              wx.showToast({
                title: '分享成功',
                icon: 'success',
                duration: 1000
              })
              wx.navigateTo({
                url: '../success/success'
              })
            } else {
              wx.showToast({
                title: '分享失败',
                duration: 1000
              })
            }
          }
        })

      },
      fail (res) {
        // 分享失败
        wx.showToast({
          title: '分享失败',
          duration: 2000
        })
      }
    }
  }
})
