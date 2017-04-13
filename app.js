import Config from './utils/config.js'

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
            url: Config.host + 'login',
            data: {
              code: res.code
            },
            success: function(res) {
              // 这里需要存储 3rd_session
              wx.setStorageSync('session_key', res.data.bizContent)
            }
          })

          wx.getUserInfo({
            success: function (res) {
              wx.request({
                url: Config.host + 'getuserinfo',
                data: {
                  userinfo: JSON.stringify(res),
                  key: wx.getStorageSync('session_key')
                },
                method: 'POST',
                header: {'content-type':'application/json'},
                success: function(res){
                  console.log(res.data)
                }
              })
            }
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
      wx.login({
        success: function(res) {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})
