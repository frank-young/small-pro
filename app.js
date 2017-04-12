//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // logs.unshift(Date.now())
    // wx.setStorageSync('logs', logs)
    wx.login({
      success: function(res) {
        if (res.code) {
          wx.request({
            url: 'http://frank.s1.natapp.link/cp-api/public/api/v1.0.0/login',
            data: {
              code: res.code
            }
          })
          wx.showToast({
            title: '登录成功',
            duration: 1000
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    // wx.checkSession({
    //   success: function(){
    //     //session 未过期，并且在本生命周期一直有效
    //     wx.showToast({
    //       title: '未过期',
    //       duration: 1000
    //     })
    //   },
    //   fail: function(){
    //     //登录态过期
    //
    //   }
    // })

  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.getUserInfo({
        success: function (res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})
