//index.js
import City from '../../utils/city.js'

Page({
  data: {
    motto: 'index',
    date: "1996-01-01",

    sex: ['男', '女'],
    sexIndex: 0,

    constellationArray: ['水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '魔羯座'],
    constellationIndex: 0,

    provinceIndex: 0,
    cityIndex: 0,
    provinceName: '北京市',
    cityName: '北京市',
    provinceArray : City.province,
    cityObj: City.city,
    provinceId: City.province[0].id,

    areaIndex: 0,
    areaArray: ['只接受同城', '只接受异地', '都可以接受'],

    ageIndex: 0,
    ageArray: ['都可以接受', '只接受比自己大的', '只接受比自己小的']
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
  bindConstellationChange (e) {
    this.setData({
        constellationIndex: e.detail.value
    })
  },
  bindProvinceChange (e) {
    this.setData({
        provinceIndex: e.detail.value,
        cityIndex: 0,
        provinceId: City.province[e.detail.value].id,
        provinceName: City.province[e.detail.value].name
    })
  },
  bindCityChange (e) {
    let id = this.data.provinceId
    this.setData({
        cityIndex: e.detail.value,
        cityName: City.city[id][e.detail.value].name
    })
  },
  bindAreaChange (e) {
    this.setData({
        areaIndex: e.detail.value
    })
  },
  bindAgeChange (e) {
    this.setData({
        ageIndex: e.detail.value
    })
  },
  formSubmit (e) {
    wx.showToast({
      title: '提交成功',
      icon: 'success',
      duration: 1000
    })
    wx.navigateTo({
      url: '../share/share'
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
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
