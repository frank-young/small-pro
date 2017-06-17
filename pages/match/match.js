import Config from '../../utils/config.js'

const SUCCESS = true

Page({
  data: {
    matchInfo: {},
    isAttendance: false
  },
  onLoad () {
    let that = this;
    wx.showLoading({
      title: '加载中'
    })
    this.isAttendance()
    this.setUserInfo()
  },
  setUserInfo () {
    let that = this
    wx.request({
      url: Config.host + 'match',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            matchInfo: res.data.bizContent
          })
          that.drawArc(res.data.bizContent.offset)
        } else {
          wx.showModal({
            title: '匹配失败😦',
            showCancel: false,
            confirmText: '知道啦',
            confirmColor: '#f8614a',
            content: '匹配未匹配成功，sorry，本次活动暂时未找到适合你的CP，不要灰心，我们一直都在帮你寻找哟😯，返回后报名参加下次活动',
            success () {
              wx.switchTab({
                url: '../index/index'
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
  isAttendance () {
    let that = this
    wx.request({
      url: Config.host + 'match/attendance/status',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success === SUCCESS) {
          that.setData({
            isAttendance: true
          })
        }
      }
    })
  },
  drawArc(offset) {
    const ctx = wx.createCanvasContext('myCanvas')
    ctx.setFontSize(28)
    ctx.setFillStyle('#ffffff')
    ctx.fillText(Number(100 - offset).toFixed(2) + '%', 58, 72)

    ctx.beginPath()
    ctx.arc(100, 75, 60, 1 * Math.PI, 2 * Math.PI)
    ctx.setStrokeStyle('#dddddd')
    ctx.setLineWidth(8)
    ctx.stroke()

    // Draw arc
    ctx.beginPath()
    ctx.arc(100, 75, 60, 1 * Math.PI, (2 * (100 - offset / 2) / 100) * Math.PI)
    ctx.setStrokeStyle('#ffffff')
    ctx.setLineWidth(8)
    ctx.stroke()

    ctx.draw()
  },
  toAttendance () {
    wx.navigateTo({
      url: '../attendance/attendance'
    })
  },
  toDetail () {
    wx.navigateTo({
      url: '../detail/detail'
    })
  }
})
