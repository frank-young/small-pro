//index.js
Page({
  data: {
  },
  editInfo () {
    wx.navigateTo({
      url: '../editinfo/editinfo'
    })
  },
  returnIndex () {
    wx.navigateTo({
      url: '../index/index'
    })
  },
  onLoad () {
  },
  onReady (){
    // 生命周期函数--监听页面初次渲染完成
  },
  onShow (){
    // 生命周期函数--监听页面显示
  }
})
