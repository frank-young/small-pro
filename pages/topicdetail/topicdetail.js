Page({
  data: {
    topic: {
      id: 1,
      src: '../../resources/topic.jpg',
      title: '如果在有一天',
      desc: '假如生活欺骗了你，不要悲伤，不要犹豫，不要心计。悲伤的日子将会过去，快乐的日子将会来临。'
    },
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
  onLoad () {

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
  },
  viewReplayCtrl () {
    console.log('查看回复操作')
  }
})
