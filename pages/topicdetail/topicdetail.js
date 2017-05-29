import Config from '../../utils/config.js'

Page({
  data: {
    topic: {},
    id: null,
    isLoading: true,
    comments: [],
    offset: 0,
    limit: 10,
    topicpraise: {
      praise_status: 0
    }
  },
  onLoad (options) {
    this.setData({
      id: options.id
    })
    // this.getTopic(options.id)
    // this.getComments(options.id, this.data.offset, this.data.limit)
  },
  onShow () {
    this.getTopic(this.data.id)
    this.refreshComments(this.data.id, 0, 10)
    this.getTopicPraiseStatus(this.data.id)
  },
  /*
   * 获取话题详情
   */
  getTopic (id) {
    let that = this
    that.setData({
      isLoading: false
    })
    wx.request({
      url: Config.host + 'topic/show',
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: id
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        that.setData({
          topic: res.data.bizContent,
          isLoading: true
        })
      }
    })
  },
  /*
   * 获取话题评论
   */
  getComments (topic_id, offset, limit) {
    let that = this
    that.setData({
      isLoading: false
    })
    wx.request({
      url: Config.host + 'comment/index',
      data: {
        session_key: wx.getStorageSync('session_key'),
        topic_id,
        offset,
        limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        let comments = []
        comments = that.data.comments
        comments.push(...res.data.bizContent)
        that.setData({
          comments,
          isLoading: true,
          offset: offset + limit
        })
      }
    })
  },
  /*
   *  刷新话题评论
   */
  refreshComments (topic_id, offset, limit) {
    let that = this
    wx.request({
      url: Config.host + 'comment/index',
      data: {
        session_key: wx.getStorageSync('session_key'),
        topic_id,
        offset,
        limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        that.setData({
          comments: res.data.bizContent,
          offset: offset + limit
        })
      }
    })
  },
  /*
   * 点赞状态
   */
  getTopicPraiseStatus (topic_id) {
    let that = this
    wx.request({
      url: Config.host + 'topicpraise/status',
      data: {
        session_key: wx.getStorageSync('session_key'),
        topic_id,
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        that.setData({
          topicpraise: res.data.bizContent
        })
      }
    })
  },
  // 点赞操作
  topicPraiseCtrl () {
    let that = this
    wx.request({
      url: Config.host + 'topicpraise/agree',
      data: {
        session_key: wx.getStorageSync('session_key'),
        topic_id: this.data.id
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        that.getTopicPraiseStatus(that.data.id)
        that.getTopic(that.data.id)
        that.setData({
          topicpraise: {
            praise_status: 1
          }
        })
      }
    })
  },
  // 取消点赞操作
  topicCancelPraiseCtrl () {
    let that = this
    wx.request({
      url: Config.host + 'topicpraise/cancel',
      data: {
        session_key: wx.getStorageSync('session_key'),
        topic_id: this.data.id
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        that.getTopicPraiseStatus(that.data.id)
        that.getTopic(that.data.id)
        that.setData({
          topicpraise: {
            praise_status: 0
          }
        })
      }
    })
  },
  onPullDownRefresh (){
    this.refreshComments(this.data.id, 0, 10)
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.setData({
      isLoading: false
    })
    this.getComments(this.data.id, this.data.offset, this.data.limit)
  },
  // 评论更多操作
  moreCtrl (event) {
    let id = event.currentTarget.dataset.commentId
    wx.showActionSheet({
      itemList: ['回复', '举报'],
      success: function(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '../replay/replay?comment_id=' + id
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  praiseCtrl (event) {
    let index = event.target.dataset.index
    console.log(event)
    // this.data.comments[index].praise.praise_status = 1
    setTimeout(() => {
      console.log('点赞成功')
      this.setData({
        comments: this.data.comments
      })
    }, 500)
  },
  cancelPraiseCtrl (event) {
    let index = event.target.dataset.index
    console.log(event.target)
    console.log(this.data.comments[index])
    this.data.comments[index].praise.praise_status = 0
    setTimeout(() => {
      console.log('取消点赞成功')
      this.setData({
        comments: this.data.comments
      })
    }, 500)
  },
  // 话题评论
  topicCommentCtrl () {
    wx.navigateTo({
      url: '../comment/comment?topic_id=' + this.data.topic.id
    })
  },
  // 回复评论操作
  replayCtrl (event) {
    let id = event.target.dataset.commentId
    wx.navigateTo({
      url: '../replay/replay?comment_id=' + id
    })
  },
  // 查看更多回复
  viewReplayCtrl (event) {
    let id = event.target.dataset.commentId
    wx.navigateTo({
      url: '../replaylist/replaylist?comment_id=' + id
    })
  }
})
