//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
  },
  bindViewTap: function() {
  },
  onLoad: function () {
    wx.redirectTo({
      url: '../index/index'
    })
  }
})
