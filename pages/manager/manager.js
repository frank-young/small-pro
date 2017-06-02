import Config from '../../utils/config.js'

Page({
  data: {
    isChecked: false,
    term: ''
  },
  onLoad () {
    this.getTermStatus()
  },
  getTermStatus () {
    let that = this
    wx.request({
      url: Config.host + 'manager/term/info',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            term: res.data.bizContent.term,
            isChecked: res.data.bizContent.status === 1 ? true : false
          })
        }
      }
    })
  },
  changeTermStatus (event) {
    let that = this
    if (event.detail.value) {
      wx.request({
        url: Config.host + 'manager/term/start',
        data: {
          session_key: wx.getStorageSync('session_key')
        },
        method: 'POST',
        header: {'content-type':'application/x-www-form-urlencoded'},
        success (res){
          if (res.data.success) {
            that.setData({
              term: res.data.bizContent.term
            })
          }
        }
      })
    } else {
      wx.request({
        url: Config.host + 'manager/term/stop',
        data: {
          session_key: wx.getStorageSync('session_key')
        },
        method: 'POST',
        header: {'content-type':'application/x-www-form-urlencoded'},
        success (res){
          if (res.data.success) {
            that.setData({
              term: res.data.bizContent.term
            })
          }
        }
      })
    }
  }
})
