//index.js
import City from '../../utils/city.js'
import Config from '../../utils/config.js'

var app = getApp()

Page({
  data: {
    motto: 'index',
    userInfo: {},
    date: "1996-01-01",

    /*
     * 性别
     */
    sex: ['未知', '男', '女'],
    sexIndex: 0,

    /*
     * 星座
     */
    constellationArray: ['水瓶座', '双鱼座', '白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '魔羯座'],
    constellationIndex: 0,

    /*
     * 城市选择
     */
    provinceIndex: 0,
    cityIndex: 0,
    provinceArray : City.province,
    cityObj: City.city,
    provinceId: City.province[0].id,

    /*
     * 区域规则
     */
    areaIndex: 0,
    areaArray: ['只接受同城', '只接受异地', '都可以接受'],

    /*
     * 年龄规则
     */
    ageIndex: 0,
    ageArray: ['都可以接受', '只接受比自己大的', '只接受比自己小的'],

    /*
     * 问卷部分
     */
    radioItems: [
        {name: '第一个答案', value: '0'},
        {name: '第二个答案', value: '1', checked: true}
    ],
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
    })
  },
  bindCityChange (e) {
    let id = this.data.provinceId
    this.setData({
        cityIndex: e.detail.value,
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
  radioChange: function (e) {
      console.log('radio发生change事件，携带value值为：', e.detail.value);

      var radioItems = this.data.radioItems;
      for (var i = 0, len = radioItems.length; i < len; ++i) {
          radioItems[i].checked = radioItems[i].value == e.detail.value;
      }

      this.setData({
          radioItems: radioItems
      });
  },
  formSubmit (e) {
    e.detail.value.session_key = wx.getStorageSync('session_key')
    wx.request({
      url: Config.host + 'info',
      data: e.detail.value,
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success: function(res){
        wx.showToast({
          title: '提交成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
    // wx.navigateTo({
    //   url: '../share/share'
    // })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  onLoad () {
    let that = this
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        sexIndex:userInfo.gender
      })
    })
  },
  onReady (){
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
