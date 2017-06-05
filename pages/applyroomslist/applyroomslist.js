import Config from '../../utils/config.js'

Page({
  data: {
    offset: 0,
    limit: 10,
    applyRooms: [],
    isLoading: true
  },
  bindViewTap: function() {
  },
  onLoad () {
    this.refreshApplyRoomslist(0, 10)
  },
  /*
   *  获取列表操作
   */
  getApplyRoomslist (offset, limit) {
    let that = this
    that.setData({
      isLoading: false
    })
    wx.request({
      url: Config.host + 'applyroom/index',
      data: {
        session_key: wx.getStorageSync('session_key'),
        offset: offset,
        limit: limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          let applyRooms = []
          applyRooms = that.data.applyRooms
          applyRooms.push(...res.data.bizContent)
          that.setData({
            applyRooms: applyRooms,
            isLoading: true,
            offset: offset + limit
          })
        }
      }
    })
  },
  /*
   *  刷新操作
   */
  refreshApplyRoomslist (offset, limit) {
    let that = this
    that.setData({
      isLoading: false
    })
    wx.request({
      url: Config.host + 'applyroom/index',
      data: {
        session_key: wx.getStorageSync('session_key'),
        offset: offset,
        limit: limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            applyRooms: res.data.bizContent,
            isLoading: true,
            offset: offset + limit
          })
        }
      }
    })
  },
  /*
   *  同意操作
   */
  agree (event) {
    let that = this
    let openid = event.target.dataset.openid
    wx.showLoading({
      title: '操作中'
    })
    wx.request({
      url: Config.host + 'applyroom/agree',
      data: {
        session_key: wx.getStorageSync('session_key'),
        openid
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.refreshApplyRoomslist(0, 10)
          wx.showToast({
            title: '已同意',
            duration: 2000
          })
        }
      }
    })
  },
  /*
   *  拒绝操作
   */
  notAgree (event) {
    let that = this
    let openid = event.target.dataset.openid
    wx.showLoading({
      title: '操作中'
    })
    wx.request({
      url: Config.host + 'applyroom/notagree',
      data: {
        session_key: wx.getStorageSync('session_key'),
        openid
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.refreshApplyRoomslist(0, 10)
          wx.showToast({
            title: '已拒绝',
            duration: 2000
          })
        }
      },
      complete () {
          wx.hideLoading()
      }
    })
  },
  onPullDownRefresh (){
    this.refreshApplyRoomslist(0, 10)
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.setData({
      isLoading: false
    })
    this.getApplyRoomslist(this.data.offset, this.data.limit)
  },
})
