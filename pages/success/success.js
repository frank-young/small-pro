//index.js
Page({
  data: {
    motto: '还差一步',
    userInfo: {},
    share: {
      title: '这是标题档～',
      desc: '这是一些描述',
      path: '/pages/index/index'
    }
  },
  editInfo () {
    wx.navigateTo({
      url: '../editinfo/editinfo'
    })
  },
  onLoad () {
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
  }
})
