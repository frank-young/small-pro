import Config from '../../utils/config.js'

Page({
  data: {
    offset: 0,
    limit: 10,
    rooms: [],
    isLoading: true
  },
  onLoad () {
  },
  onShow () {
    this.refreshRooms(0, 10)
  },
  /*
   *  获取列表操作
   */
  getRooms (offset, limit) {
    let that = this
    that.setData({
      isLoading: false
    })
    wx.request({
      url: Config.host + 'room/index',
      data: {
        session_key: wx.getStorageSync('session_key'),
        offset: offset,
        limit: limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          let rooms = []
          rooms = that.data.rooms
          rooms.push(...res.data.bizContent)
          that.setData({
            rooms: rooms,
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
  refreshRooms (offset, limit) {
    let that = this
    that.setData({
      isLoading: false
    })
    wx.request({
      url: Config.host + 'room/index',
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
            rooms: res.data.bizContent,
            isLoading: true,
            offset: offset + limit
          })
        }
      }
    })
  },
  // 创建房间
  createRoom () {
    wx.navigateTo({
      url: '../addroom/addroom'
    })
  },
  onPullDownRefresh (){
    this.refreshRooms(0, 10)
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.setData({
      isLoading: false
    })
    this.getRooms(this.data.offset, this.data.limit)
  }
})
