import Config from '../../utils/config.js'
const SUCCESS = true

Page({
  data: {
    /*
     * 按钮部分
     */
    text: '',
    url: '../info/info',
    /*
     * 跳转任务链接
     */
    index: 0
  },
  apply () {
    let url = this.data.url
    wx.navigateTo({
      url: '../info/info'
    })
  },
  editInfo () {
    let url = this.data.url
    wx.navigateTo({
      url: '../editinfo/editinfo'
    })
  },
  matchQuery () {
    let url = this.data.url
    wx.navigateTo({
      url: '../match/match'
    })
  },
  share () {
    let url = this.data.url
    wx.navigateTo({
      url: '../share/share'
    })
  },
  task () {
    let that = this
    let url = this.data.url
    wx.navigateTo({
      url: '../task/task?index=' + that.data.index
    })
  },
  onLoad () {
    this.termStatus()
    this._getSelfTask()
    this.defaultTaskArr()
  },
  _getSelfTask () {
    let that = this
    wx.request({
      url: Config.host + 'task/list',
      method: 'POST',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success === SUCCESS) {
          let taskArr = JSON.parse(res.data.bizContent.task_arr)
          wx.setStorageSync('task_arr', taskArr)
          wx.setStorageSync('group_id', res.data.bizContent.group_id)
          wx.setStorageSync('term', res.data.bizContent.term)
          that.setData({
            index: taskArr.length - 1
          })
        }
      }
    })
  },
  defaultTaskArr () {
    if (wx.getStorageSync('task_arr').length !== 0) {
      this.setData({
        index: wx.getStorageSync('task_arr').length - 1
      })
    }
  },
  termStatus (){
    let that = this
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: Config.host + 'term/status',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success: function(res){
        if (res.data.success === SUCCESS) {
          if (res.data.bizContent === 1) {
            that.setData({
              text: '立即报名',
              url: '../info/info'
            })
          } else if (res.data.bizContent === 2) {
            that.setData({
              text: '修改资料',
              url: '../editinfo/editinfo'
            })
          }
        } else {
          that.setData({
            text: '匹配查询',
            url: '../match/match'
          })
        }
        wx.hideLoading()
      }
    })
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
          duration: 1000
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
