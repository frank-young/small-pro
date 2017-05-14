import Config from '../../utils/config.js'

Page({
  data: {
    src: 'http://frank.s1.natapp.link/qrcode.jpg',
    roomWxId: 'frankyoung826'
  },
  onLoad () {
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
        that.setData({
          matchInfo: res.data.bizContent
        })
        wx.hideLoading()
      }
    })
  },
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
  copyRoomWxid () {
    let that = this
    wx.setClipboardData({
      data: that.data.roomWxId,
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
      urls: [that.data.src]
    })
  }
})
