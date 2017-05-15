import Config from './utils/config.js'

App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    // var logs = wx.getStorageSync('logs') || []
    // wx.setStorageSync('logs', logs)
    let that = this
    wx.checkSession({
      success: function(){
        // 应该是不采取操作
        console.log('success')
      },
      fail: function(){
        that.login()
      }
    })
    this.login()
  },
  login: function() {
    wx.login({
      success: function(loginData) {
        if (loginData.code) {
          wx.getUserInfo({
            success (userData) {
              wx.request({
                url: Config.host + 'getuserinfo',
                data: {
                  userinfo: JSON.stringify(userData),
                  code: loginData.code
                },
                method: 'POST',
                header: {'content-type':'application/x-www-form-urlencoded'},
                success (res){
                  wx.setStorageSync('session_key', res.data.bizContent)
                }
              })
            },
            fail () {
              wx.request({
                url: Config.host + 'login',
                data: {
                  code: loginData.code
                },
                method: 'POST',
                header: {'content-type':'application/x-www-form-urlencoded'},
                success: function(res) {
                  wx.setStorageSync('session_key', res.data.bizContent)
                }
              })
            },
            complete () {
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
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
