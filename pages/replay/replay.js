import Config from '../../utils/config.js'
import Verify from '../../utils/verify.js'

Page({
  data: {
    id: null
  },
  onLoad (options) {
    this.setData({
      id: options.comment_id
    })
  },
  submit (e) {
    let that = this
    let replay = e.detail.value.replay
    let verify = Verify.commentVerify(replay)
    if (verify.status) {
      wx.showLoading({
        title: '操作中'
      })
      wx.request({
        url: Config.host + 'replaycomment/create',
        data: {
          session_key: wx.getStorageSync('session_key'),
          comment_id: that.data.id,
          content: replay
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
    } else {
      wx.showToast({
        title: verify.text,
        duration: 2000
      })
    }
  }
})
