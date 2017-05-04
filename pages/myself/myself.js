var app = getApp()
Page({
  data: {
    motto: '每天都有好心情',
    userInfo: {},
    share: {
      title: '这是标题',
      desc: '这是一些描述',
      path: '/pages/index/index'
    },
    array: [
        {
          'age': 90,
          'message': 'foo'
        },
        {
          'age': 80,
          'message': 'save'
        },
        {
          'age': 45,
          'message': 'sdahdsak'
        }
      ]
  },
  bindViewTap: function() {
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })

  },
  onReady:function(){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow:function(){
    // 生命周期函数--监听页面显示
  },
  onHide:function(){
    // 生命周期函数--监听页面隐藏
  },
  onUnload:function(){
    // 生命周期函数--监听页面卸载
  },
  onPullDownRefresh: function() {
    // 页面相关事件处理函数--监听用户下拉动作
  },
  onReachBottom: function() {
    // 页面上拉触底事件的处理函数
  },
  onShareAppMessage: function() {
    // 用户点击右上角分享
    return {
      title: this.data.share.title,
      path: this.data.share.path,
      success: function(res) {
        wx.showToast({
          title: '分享成功',
          icon: 'success',
          duration: 2000
        })
        console.log('success')
        wx.navigateTo({
          url: '../success/success'
        })
      },
      fail: function(res) {
        // 分享失败
        wx.showToast({
          title: '分享失败',
          duration: 2000
        })
      }
    }
  }
})
