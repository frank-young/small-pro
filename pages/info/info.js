//index.js
import City from '../../utils/city.js'
import Config from '../../utils/config.js'
import Questions from '../../utils/questions.js'
import Verify from '../../utils/verify.js'

var app = getApp()
const SUCCESS = true

Page({
  data: {
    motto: 'index',
    userInfo: {},
    date: "1996-01-01",

    /*
     * 性别
     */
    sex: ['男', '女'],
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
    questions: Questions.questions,

    /*
     * 获取默认信息
     */
    info: {
      name: '',
      phone: '',
      wechat_id: '',
      school: '',
      dislike: '',
      evaluate: ''
    }
  },
  // 设置性别
  bindSexChange (e) {
    this.setData({
        sexIndex: e.detail.value
    })
  },
  // 出生日期设置
  bindDateChange (e) {
    this.setData({
        date: e.detail.value
    })
  },
  // 星座设置
  bindConstellationChange (e) {
    this.setData({
        constellationIndex: e.detail.value
    })
  },
  // 省份设置
  bindProvinceChange (e) {
    this.setData({
        provinceIndex: e.detail.value,
        cityIndex: 0,
        provinceId: City.province[e.detail.value].id,
    })
  },
  // 城市设置
  bindCityChange (e) {
    let id = this.data.provinceId
    this.setData({
        cityIndex: e.detail.value,
    })
  },
  // 地域规则
  bindAreaChange (e) {
    this.setData({
        areaIndex: e.detail.value
    })
  },
  // 年龄规则
  bindAgeChange (e) {
    this.setData({
        ageIndex: e.detail.value
    })
  },
  // 关于aco
  openAlert () {
    wx.showModal({
      content: 'Aco测评是由小呐独创的性格测试，我们将根据此测试并且结合我们的专业算法来匹配一个和你性格最合适的人。有木有很激动？',
      showCancel: false,
      confirmText: '激动'
    })
  },
  getDefaultInfo () {
    let that = this
    wx.request({
      url: Config.host + 'info/show/again',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success === SUCCESS) {
          let info = res.data.bizContent
          that.setData({
            info: info,
            sexIndex: info.sex,
            constellationIndex: info.constellation,
            date: info.birthday,
            provinceIndex: info.province_index,
            provinceId: City.province[info.province_index].id,
            cityIndex: info.city_index,
            questions: that.questionsChecked(info.questions)
          })
        }
        wx.hideLoading()
      }
    })
  },
  questionsChecked (value) {
    let questionsArr = []
    Questions.questions.forEach((v, i) => {
      v.answers.forEach((answer) => {
        if (answer.score === Number(value[i])) {
          answer.checked = true
        }
      })
      questionsArr.push(v)
    })
    return questionsArr
  },
  formSubmit (e) {
    e.detail.value.session_key = wx.getStorageSync('session_key')
    let verify = Verify.verify(e.detail.value)
    if (verify.status === SUCCESS) {
      wx.showLoading({
        title: '提交中',
      })
      wx.request({
        url: Config.host + 'info',
        data: e.detail.value,
        method: 'POST',
        header: {'content-type':'application/x-www-form-urlencoded'},
        success (res){
          if (res.data.success === SUCCESS) {
            wx.showToast({
              title: '提交成功',
              icon: 'success',
              duration: 1000
            })
            wx.redirectTo({
              url: '../share/share'
            })
          } else {
            wx.showToast({
              title: '失败',
              duration: 1000
            })
          }
        }
      })
    } else {
      wx.showToast({
        title: verify.text,
        duration: 2000
      })
    }
  },
  onLoad () {
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo: userInfo,
        sexIndex: userInfo.gender - 1
      })
    })
    this.getDefaultInfo()

  }
})
