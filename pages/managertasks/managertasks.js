import Config from '../../utils/config.js'

Page({
  data: {
    offset: 0,
    limit: 10,
    tasks: [],
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
      url: Config.host + 'taskmanager/index',
      data: {
        session_key: wx.getStorageSync('session_key'),
        offset: offset,
        limit: limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          let tasks = []
          tasks = that.data.tasks
          tasks.push(...res.data.bizContent)
          that.setData({
            tasks: tasks,
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
      url: Config.host + 'taskmanager/index',
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
            tasks: res.data.bizContent,
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
      url: '../addtask/addtask'
    })
  },
  // 发布任务
  publish (event) {
    let id = event.currentTarget.dataset.id
    let that = this
    wx.request({
      url: Config.host + 'taskmanager/publish',
      data: {
        session_key: wx.getStorageSync('session_key'),
        id
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          wx.showModal({
            title: '发布成功',
            showCancel: false,
            confirmText: '确定',
            confirmColor: '#f8614a',
            content: '任务发布成功'
          })
        }
      }
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
