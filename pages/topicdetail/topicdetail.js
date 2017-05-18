Page({
  data: {
    topic: {
      id: 1,
      src: '../../resources/topic.jpg',
      title: '如果在有一天',
      desc: '假如生活欺骗了你，不要悲伤，不要犹豫，不要心计。悲伤的日子将会过去，快乐的日子将会来临。'
    },
    isLoading: true
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
  }
})
