Page({
  data: {
    topics: [
      {
        id: 1,
        nick_name: '小文',
        avatar: '../../resources/share.jpg',
        sex: 1,
        src: ['../../resources/topic.jpg','../../resources/topic.jpg','../../resources/topic.jpg'],
        title: '如果在有一天',
        desc: '假如生活欺骗了你，不要悲伤，不要犹豫，不要心计。悲伤的日子将会过去，快乐的日子将会来临。'
      },
      {
        id: 2,
        nick_name: '小文',
        avatar: '../../resources/share.jpg',
        sex: 0,
        src: ['../../resources/topic.jpg'],
        title: '如果在有一天',
        desc: '假如生活欺骗了你，不要悲伤，不要犹豫，不要心计。'
      },
      {
        id: 3,
        nick_name: '小文',
        avatar: '../../resources/share.jpg',
        sex: 0,
        src: [],
        title: '如果在有一天',
        desc: '假如生活欺骗了你，不要悲伤，不要犹豫。悲伤的日子将会过去，快乐的日子将会来临。悲伤的日子将会过去，快乐的日子将会来临。悲伤的日子将会过去，快乐的日子将会来临。'
      },
      {
        id: 4,
        nick_name: '小文',
        avatar: '../../resources/share.jpg',
        sex: 1,
        src: ['../../resources/topic.jpg','../../resources/topic.jpg','../../resources/topic.jpg'],
        title: '如果在有一天',
        desc: '假如生活欺骗了你，不要悲伤，不要犹豫，不要心计。悲伤的日子将会过去，快乐的日子将会来临。'
      }
    ],
    isLoading: true
  },
  onLoad () {

  },
  onPullDownRefresh (){
    setTimeout(() => {
      let arr = [{
        id: 5,
        src: ['../../resources/topic.jpg'],
        title: '刷新的数据',
        desc: '这是刷新的数据00'
      }]
      let newTopics = arr.concat(this.data.topics)
      // wx.showToast({
      //   title: '刷新成功',
      //   icon: 'success',
      //   duration: 1000
      // })
      this.setData({
        topics: newTopics
      })
      wx.stopPullDownRefresh()
    }, 800)
  },
  onReachBottom () {
    this.setData({
      isLoading: false
    })
    setTimeout(() => {
      let arr = [{
        id: 5,
        src: ['../../resources/topic.jpg'],
        title: '加载的数据',
        desc: '假如生活欺骗了你，不要悲伤，不要犹豫，不要心计。'
      }]
      let newTopics = this.data.topics.concat(arr)
      this.setData({
        isLoading: true,
        topics: newTopics
      })
    }, 500)
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
