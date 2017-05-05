import Config from '../../utils/config.js'

Page({
  data: {
    motto: '还差一步',
    matchInfo: {}
  },
  onLoad () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: Config.host + 'match',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success: function(res){
        console.log(res.data.bizContent)
        that.setData({
          matchInfo: res.data.bizContent
        })
        wx.hideLoading()
      }
    })
  },
  copyWxid () {
    let that = this
    wx.setClipboardData({
      data: that.data.matchInfo.wechat_id,
      success: function(res) {
        wx.getClipboardData({
          success: function(res) {
            wx.showToast({
              title: '复制成功',
              icon: 'success',
              duration: 1000
            })
          }
        })
      }
    })
  },
  gowx () {
    wx.openSetting({
      success: (res) => {
        res.authSetting = {
          "scope.userInfo": true,
          // "scope.userLocation": true
          'scope.address': true
        }

      }
    })

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
