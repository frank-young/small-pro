import Config from '../../utils/config.js'
const SUCCESS = true

Page({
  data: {
    motto: '还差一步',
    share: {
      title: '小呐一周CP，赶紧来参加！',
      desc: '小呐一周CP，独创的匹配算法，给你带来的幸福的体验',
      path: '/pages/index/index'
    },
    src: '../../resources/share.jpg',
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
  onReady (){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow (){
    // 生命周期函数--监听页面显示
  },
  onHide (){
    // 生命周期函数--监听页面隐藏
  },
  onUnload (){
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh () {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom () {
    // 页面上拉触底事件的处理函数
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
            if (res.data.success === SUCCESS) {
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
