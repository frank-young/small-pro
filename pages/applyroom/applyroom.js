import Config from '../../utils/config.js'

Page({
  data: {
    /*
     * 文件上传操作
     */
    files: [],  // 压缩图片，高度压缩，缩略图
    viewFiles: [],  // 预览图，也就是显示的时候的图，轻微压缩
    uptoken: '',
    disabledUpload: false,
    isDelete: true
  },
  onLoad () {

  },
  submit (event) {
    let that = this,
        name = event.detail.value.name,
        phone = event.detail.value.phone,
        content = event.detail.value.content
    wx.showLoading({
      title: '操作中'
    })
    wx.request({
      url: Config.host + 'applyroom/create',
      data: {
        session_key: wx.getStorageSync('session_key'),
        name,
        phone,
        content,
      },
      method: 'POST',
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success) {
          wx.showToast({
            title: res.data.message,
            duration: 2000
          })
          wx.navigateBack({
            delta: 1
          })
        }
      }
    })
  }
})
