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
        if (res.data.success) {
          that.setData({
            topic: res.data.bizContent,
            isLoading: true
          })
        }
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
        if (res.data.success) {
          let comments = []
          comments = that.data.comments
          comments.push(...res.data.bizContent)
          that.setData({
            comments,
            isLoading: true,
            offset: offset + limit
          })
        }
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
        if (res.data.success) {
          that.setData({
            comments: res.data.bizContent,
            offset: offset + limit
          })
        }
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
        if (res.data.success) {
          that.setData({
            topicpraise: res.data.bizContent
          })
        }
      }
    })
  },
  // 话题点赞操作
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
        if (res.data.success) {
          that.getTopicPraiseStatus(that.data.id)
          that.getTopic(that.data.id)
          that.setData({
            topicpraise: {
              praise_status: 1
            }
          })
        }
      }
    })
  },
  // 话题取消点赞操作
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
        if (res.data.success) {
          that.getTopicPraiseStatus(that.data.id)
          that.getTopic(that.data.id)
          that.setData({
            topicpraise: {
              praise_status: 0
            }
          })
        }
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
    let commentId = event.currentTarget.dataset.commentId
    wx.showActionSheet({
      itemList: ['回复', '举报'],
      success: function(res) {
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '../replay/replay?comment_id=' + commentId
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  /*
   * 评论点赞操作
   */
  praiseCtrl (event) {
    let that = this
    let commentId = event.currentTarget.dataset.commentId
    let index = event.currentTarget.dataset.index

    wx.request({
      url: Config.host + 'commentpraise/agree',
      data: {
        session_key: wx.getStorageSync('session_key'),
        comment_id: commentId
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          let comments = that.data.comments
          comments[index].praise = {
            praise_status: 1
          }
          comments[index].praise_num += 1
          that.setData({
            comments: comments
          })
        }
      }
    })
  },
  /*
   * 评论取消点赞操作
   */
  cancelPraiseCtrl (event) {
    let that = this
    let commentId = event.currentTarget.dataset.commentId
    let index = event.currentTarget.dataset.index

    wx.request({
      url: Config.host + 'commentpraise/cancel',
      data: {
        session_key: wx.getStorageSync('session_key'),
        comment_id: commentId
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          let comments = that.data.comments
          comments[index].praise = {
            praise_status: 0
          }
          comments[index].praise_num -= 1
          that.setData({
            comments: comments
          })
        }
      }
    })
  },
  // 话题评论
  topicCommentCtrl () {
    wx.navigateTo({
      url: '../comment/comment?topic_id=' + this.data.topic.id
    })
  },
  // 回复评论操作
  replayCtrl (event) {
    let commentId = event.currentTarget.dataset.commentId
    wx.navigateTo({
      url: '../replay/replay?comment_id=' + commentId
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
