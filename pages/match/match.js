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
      title: '加载中',
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
        that.setData({
          matchInfo: res.data.bizContent
        })
        that.drawArc(res.data.bizContent.offset)
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
    ctx.setFontSize(20)
    ctx.setFillStyle('#f8614a')
    ctx.fillText(100 - offset + '%', 67, 82)

    ctx.beginPath()
    ctx.arc(100, 75, 45, 0, 2 * Math.PI)
    ctx.setStrokeStyle('#dddddd')
    ctx.setLineWidth(8)
    ctx.stroke()

    // Draw arc
    ctx.beginPath()
    ctx.arc(100, 75, 45, 0, (2 * (100 - offset) / 100) * Math.PI)
    ctx.setStrokeStyle('#f8614a')
    ctx.setLineWidth(8)
    ctx.stroke()

    ctx.draw()
  }
})
