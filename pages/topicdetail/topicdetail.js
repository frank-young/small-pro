import Config from '../../utils/config.js'

Page({
  data: {
    topic: {},
    isLoading: true,
    comments: [
      {
        id: 1,
        topic_id: 1,
        user_id: 1,
        link_num: 232,
        praise_status: 0, // 未点赞
        nick_name: '野山椒鸡杂',
        data_time: '5-18 13:13',
        content: '假如生活欺骗了你',
        replay_num: '23'
      },
      {
        id: 2,
        topic_id: 1,
        user_id: 2,
        link_num: 133,
        praise_status: 1,
        nick_name: '左右手',
        data_time: '5-18 18:19',
        content: '人生就是如此，会经历很多人，很多事，到最后，你会发现谁还在。',
        replay_num: '123'
      },
      {
        id: 3,
        topic_id: 1,
        user_id: 3,
        link_num: 67,
        praise_status: 0,
        nick_name: '小文',
        data_time: '5-18 23:33',
        content: '人生就是如此，会经历很多人，很多事，到最后，你会发现谁还在。',
        replay_num: '343'
      },
      {
        id: 3,
        topic_id: 1,
        user_id: 3,
        link_num: 67,
        praise_status: 0,
        nick_name: '小文',
        data_time: '5-18 23:33',
        content: '人生就是如此，会经历很多人，很多事，到最后，你会发现谁还在。',
        replay_num: '343'
      },
      {
        id: 3,
        topic_id: 1,
        user_id: 3,
        link_num: 67,
        praise_status: 0,
        nick_name: '小文',
        data_time: '5-18 23:33',
        content: '人生就是如此，会经历很多人，很多事，到最后，你会发现谁还在。',
        replay_num: '343'
      },
      {
        id: 3,
        topic_id: 1,
        user_id: 3,
        link_num: 67,
        praise_status: 0,
        nick_name: '小文',
        data_time: '5-18 23:33',
        content: '人生就是如此，会经历很多人，很多事，到最后，你会发现谁还在。',
        replay_num: '343'
      },
      {
        id: 3,
        topic_id: 1,
        user_id: 3,
        link_num: 67,
        praise_status: 0,
        nick_name: '小文',
        data_time: '5-18 23:33',
        content: '人生就是如此，会经历很多人，很多事，到最后，你会发现谁还在。',
        replay_num: '343'
      },
      {
        id: 3,
        topic_id: 1,
        user_id: 3,
        link_num: 67,
        praise_status: 0,
        nick_name: '小文',
        data_time: '5-18 23:33',
        content: '人生就是如此，会经历很多人，很多事，到最后，你会发现谁还在。',
        replay_num: '343'
      }
    ]
  },
  onLoad (options) {
    console.log(options.id)
    this.getTopic(options.id)
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
  onPullDownRefresh (){
    setTimeout(() => {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 1000
      })

      wx.stopPullDownRefresh()
    }, 800)
  },
  onReachBottom () {
    this.setData({
      isLoading: false
    })
    setTimeout(() => {
      this.setData({
        isLoading: true
      })
    }, 500)
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
  },
  viewReplayCtrl () {
    console.log('查看回复操作')
    wx.navigateTo({
      url: '../replaylist/replaylist'
    })
  }
})
