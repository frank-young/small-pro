import Config from '../../utils/config.js'

Page({
  data: {
    isLoading: true,
    commentId: null,
    comment: {
      praise: null,
      praise_num: 0
    },
    replayComments: []
  },
  onLoad (options) {
    this.setData({
      commentId: options.comment_id
    })
  },
  onShow () {
    this.getComment(this.data.commentId)
    this.refreshReplayComments(this.data.commentId, 0, 10)
  },
  /*
   *  获取单个评论
   */
  getComment (id) {
    let that = this
    wx.request({
      url: Config.host + 'comment/show',
      data: {
        session_key: wx.getStorageSync('session_key'),
        id
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res) {
        if (res.data.success) {
          that.setData({
            comment: res.data.bizContent
          })
        }
      }
    })
  },
  /*
   *  获取回复列表
   */
  getReplayComments (comment_id, offset, limit) {
    let that = this
    that.setData({
      isLoading: false
    })
    wx.request({
      url: Config.host + 'replaycomment/index',
      data: {
        session_key: wx.getStorageSync('session_key'),
        comment_id,
        offset,
        limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          let replayComments = []
          replayComments = that.data.replayComments
          replayComments.push(...res.data.bizContent)
          that.setData({
            replayComments,
            isLoading: true,
            offset: offset + limit
          })
        }
      }
    })
  },
  /*
   *  刷新回复列表
   */
  refreshReplayComments (comment_id, offset, limit) {
    let that = this
    wx.request({
      url: Config.host + 'replaycomment/index',
      data: {
        session_key: wx.getStorageSync('session_key'),
        comment_id,
        offset,
        limit
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          that.setData({
            replayComments: res.data.bizContent,
            offset: offset + limit
          })
        }
      }
    })
  },
  /*
   * 评论点赞操作
   */
  praiseCtrl (event) {
    let that = this
    let commentId = event.currentTarget.dataset.commentId

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
          let comment = that.data.comment
          comment.praise = {
            praise_status: 1
          }
          comment.praise_num += 1
          that.setData({
            comment: comment
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
          let comment = that.data.comment
          comment.praise = {
            praise_status: 0
          }
          comment.praise_num -= 1
          that.setData({
            comment: comment
          })
        }
      }
    })
  },
  onPullDownRefresh (){
    this.refreshReplayComments(this.data.commentId, 0, 10)
    wx.stopPullDownRefresh()
  },
  onReachBottom () {
    this.getReplayComments(this.data.commentId, this.data.offset, this.data.limit)
  },
  moreCtrl (event) {
    let commentId = event.currentTarget.dataset.commentId
    let userName = event.currentTarget.dataset.userName
    let userId = event.currentTarget.dataset.userId
    wx.showActionSheet({
      itemList: ['回复', '举报'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '../replay/replay?comment_id=' + commentId + '&user_name=' + userName + '&user_id=' + userId
          })
        }
      },
      fail: function(res) {
        console.log(res.errMsg)
      }
    })
  },
  commentCtrl (event) {
    let id = event.currentTarget.dataset.commentId
    wx.navigateTo({
      url: '../replay/replay?comment_id=' + id
    })
  },
  // 查看原话题
  viewTopic () {
    wx.navigateBack({
      delta: 1
    })
  }
})
