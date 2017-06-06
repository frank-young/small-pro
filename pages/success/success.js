import Config from '../../utils/config.js'

Page({
  data: {
    term: {}
  },
  onLoad () {
    this.getTermInfo()
  },
  onShow (){
    // 生命周期函数--监听页面显示
  },
  getTermInfo () {
    let that = this
    wx.request({
      url: Config.host + 'manager/term/date/info',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            term: res.data.bizContent
          })
        }
      }
    })
  },
  editInfo () {
    wx.navigateTo({
      url: '../editinfo/editinfo'
    })
  },
  toIndex () {
    wx.switchTab({
      url: '../index/index'
    })
  }
})
