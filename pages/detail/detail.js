import Config from '../../utils/config.js'

Page({
  data: {
    matchInfo: {},
    room: {}
  },
  onLoad () {
    this.getMatch()
  },
  /*
   *  获取匹配信息
   */
  getMatch () {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: Config.host + 'match',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            matchInfo: res.data.bizContent
          })
          that.getRoom(res.data.bizContent.room_num)
        }
      },
      complete () {
        wx.hideLoading()
      }
    })
  },
  /*
   *  获取房间信息
   */
  getRoom (num) {
    let that = this;
    wx.request({
      url: Config.host + 'room/num',
      data: {
        session_key: wx.getStorageSync('session_key'),
        num
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            room: res.data.bizContent
          })
        }
      },
      complete () {
        wx.hideLoading()
      }
    })
  },
  /*
   *  复制cp微信号
   */
  copyWxid () {
    let that = this
    wx.setClipboardData({
      data: that.data.matchInfo.wechat_id,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showModal({
              title: '复制CP微信号成功👌',
              showCancel: false,
              confirmText: '知道啦',
              confirmColor: '#f8614a',
              content: '为了方便操作😊，请点击右上角「 ... 」，选择 ‘显示在聊天顶部’，然后直接关闭小程序，就能去加你的CP了😜， 通过微信聊天页面顶部能快速的进入到小程序喔😯',
            })
          }
        })
      }
    })
  },
  /*
   *  复制房主微信号
   */
  copyRoomWxid () {
    let that = this
    wx.setClipboardData({
      data: that.data.room.wx_id,
      success (res) {
        wx.getClipboardData({
          success (res) {
            wx.showModal({
              title: '复制房主微信号成功👌',
              showCancel: false,
              confirmText: '知道啦',
              confirmColor: '#f8614a',
              content: '添加房主微信，并注明添加信息‘cp-房间号’，房主会将你拉入本期活动微信群，你也可以保存房间二维码，自主进群😊',
            })
          }
        })
      }
    })
  },
  /*
   *  个人号解释
   */
  selfHint () {
    wx.showModal({
      title: '个人号码解释',
      showCancel: false,
      confirmText: '知道啦',
      confirmColor: '#f8614a',
      content: '此号码是你和你的cp的专属号码，在加入微信群后，通过此号码来证明你们是一对哟😊',
    })
  },
  showImage () {
    let that = this
    wx.previewImage({
      urls: that.data.room.qrcode_path
    })
    // wx.authorize({
    //     scope: 'scope.writePhotosAlbum',
    //     success () {
    //       wx.saveImageToPhotosAlbum({
    //         filePath: that.data.room.qrcode_path[0],
    //         success (res) {
    //           wx.showToast({
    //             title: '保存成功',
    //             duration: 2000
    //           })
    //         },
    //         fail () {
    //           wx.showToast({
    //             title: '保存失败',
    //             duration: 2000
    //           })
    //         }
    //       })
    //     }
    // })
  },
  toIndex () {
    wx.switchTab({
      url: '../index/index'
    })
  }
})
