import Config from '../../utils/config.js'
import Verify from '../../utils/verify.js'

Page({
  data: {
    id: null
  },
  onLoad (options) {
    this.setData({
      id: Number(options.topic_id)
    })
  },
  submit (e) {
    let that = this
    let comment = e.detail.value.comment
    let verify = Verify.commentVerify(comment)
    if (verify.status) {
      wx.showLoading({
        title: '操作中'
      })
      wx.request({
        url: Config.host + 'comment/create',
        data: {
          session_key: wx.getStorageSync('session_key'),
          topic_id: that.data.id,
          content: comment
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
