import Config from '../../utils/config.js'

Page({
  data: {
    topics: [],
    isLoading: true,
    offset: 0,
    limit: 5
  },
  onLoad () {
    this.getTopics(this.data.offset, this.data.limit)
  },
  /*
   * 获取话题
   */
  getTopics (offset, limit) {
    let that = this
    that.setData({
      isLoading: false
    })
    wx.request({
      url: Config.host + 'topic',
      data: {
        session_key: wx.getStorageSync('session_key'),
        offset: offset,
        limit: limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        let topics = []
        topics = that.data.topics
        topics.push(...res.data.bizContent)
        that.setData({
          topics: topics,
          isLoading: true,
          offset: offset + limit
        })
      }
    })
  },
  /*
   *  刷新话题
   */
  refreshTopics (offset, limit) {
    let that = this
    that.setData({
      isLoading: false
    })
    wx.request({
      url: Config.host + 'topic',
      data: {
        session_key: wx.getStorageSync('session_key'),
        offset: offset,
        limit: limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        that.setData({
          topics: res.data.bizContent,
          isLoading: true,
          offset: offset + limit
        })
      }
    })
  },
  // formatDate (d) {
  // },
  onPullDownRefresh (){
    this.refreshTopics(0, 5)
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.setData({
      isLoading: false
    })
    this.getTopics(this.data.offset, this.data.limit)
  },
  move (event) {
    console.log(event)
  },
  createTopic (event) {
    wx.navigateTo({
      url: '../addtopic/addtopic'
    })
  }
})
