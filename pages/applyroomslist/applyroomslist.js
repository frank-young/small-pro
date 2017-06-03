import Config from '../../utils/config.js'

Page({
  data: {
    offset: 0,
    limit: 10,
    applyRooms: []
  },
  bindViewTap: function() {
  },
  onLoad () {
    this.getApplyRoomslist(0, 10)
  },
  getApplyRoomslist (offset, limit) {
    let that = this
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
  }
})
