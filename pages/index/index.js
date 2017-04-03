//index.js
import City from '../../utils/city.js'

Page({
  data: {
    motto: 'index',
    date: "1996-01-01",
    share: {
      title: '加入我们',
      desc: '这是一些简单的描述～',
      path: '/pages/logs/logs'
    },
    sex: ['男', '女'],
    sexIndex: 0,
    provinceIndex:0,
    cityIndex:0,
    provinceArray : City.province,
    cityArray  : City.city
  },
  test () {
    wx.showModal({
      title: '提示',
      content: '这是一个模态弹窗',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  bindSexChange (e) {
    this.setData({
        sexIndex: e.detail.value
    })
  },
  bindDateChange (e) {
    this.setData({
        date: e.detail.value
    })
  },
  bindProvinceChange (e) {
    this.setData({
        provinceIndex: e.detail.value,
        cityIndex: 0
    })
  },
  bindCityChange (e) {
    this.setData({
        cityIndex: e.detail.value
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
          duration: 2000
        })
        console.log('success')
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
