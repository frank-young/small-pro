//index.js
Page({
  data: {
    motto: '还差一步',
    share: {
      title: '这是标题档～',
      desc: '这是一些描述',
      path: '/pages/index/index'
    },
    src: '../../resources/share.png'
  },
  back () {
    wx.navigateBack({
      delta: 1
    })
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
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 1000
        })
        wx.navigateTo({
          url: '../success/success'
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
