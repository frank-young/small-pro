import Config from '../../utils/config.js'

Page({
  data: {
    isLoading: true,
    commentId: null,
    comment: {},
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
        that.setData({
          comment: res.data.bizContent
        })
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
        let replayComments = []
        replayComments = that.data.replayComments
        replayComments.push(...res.data.bizContent)
        that.setData({
          replayComments,
          isLoading: true,
          offset: offset + limit
        })
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
        that.setData({
          replayComments: res.data.bizContent,
          offset: offset + limit
        })
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
  moreCtrl () {
    wx.showActionSheet({
      itemList: ['回复', '举报'],
      success: function(res) {
        console.log(res.tapIndex)
        if (res.tapIndex === 0) {
          wx.navigateTo({
            url: '../replay/replay'
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
    this.data.comments[index].praise_status = 1
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
    this.data.comments[index].praise_status = 0
    setTimeout(() => {
      console.log('取消点赞成功')
      this.setData({
        comments: this.data.comments
      })
    }, 500)
  },
  commentCtrl () {
    console.log('评论操作')
    wx.navigateTo({
      url: '../replay/replay'
    })
  }
})
