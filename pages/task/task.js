import Config from '../../utils/config.js'
import QiniuUploader from '../../utils/qiniuUploader.js'

const SUCCESS = true

Page({
  data: {
      files: [],
      uptoken: '',
      disabledUpload: false,
      task: '',
      id: 1,
      isDelete: true,
      isComplete: true
  },
  onLoad (options) {
    this.getQiniuToken()
    console.log(options.id)
    this.setData({
      id: options.id
    })
  },
  previewImage(e){
      wx.previewImage({
          current: e.currentTarget.id, // 当前显示图片的http链接
          urls: this.data.files // 需要预览的图片http链接列表
      })
  },
  showDeleteBox () {
    this.setData({
      isDelete: false
    })
  },
  deleteImage (e) {
    wx.showModal({
      title: '提示',
      content: '是否删除图片',
      confirmColor: '#f8614a',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  getQiniuToken () {
    let that = this
    wx.request({
      url: Config.host + 'task/qiniu/token',
      method: 'POST',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      success: function(res){
        if (res.data.success === SUCCESS) {
          that.setData({
            uptoken: res.data.bizContent
          })
        }
      }
    })
  },
  chooseImage: function (e) {
      var that = this
      wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success: function (res) {
        let filePath = res.tempFilePaths[0];
        that.setData({
          files: that.data.files.concat(res.tempFilePaths),
          isComplete: false
        })
        // QiniuUploader.upload(filePath, (qiniuRes) => {
        //   that.setData({
        //     files: that.data.files.concat(qiniuRes.imageURL)
        //   })
        //
        //   if (that.data.files.length >= 9) {
        //     that.setData({
        //       disabledUpload: true
        //     })
        //   }
        // },
        // (error) => {
		    //     console.log('error: ' + error);
        // },
        // {
        //   uploadURL: 'https://upload-z1.qbox.me',
        //   domain: 'http://images.nanafly.com/',
        //   uptoken: that.data.uptoken
        // });
      }
    })
  },
  upload(page, path) {
    wx.showToast({
      icon: 'loading',
      title: "正在上传"
    })
    wx.uploadFile({
      // url: Config.host + '/upload/images',
      url: 'images.nanafly.com' + '/imageView2/0/interlace/1/q/75|watermark/2/text/bmFuYS1jcA==/font/5b6u6L2v6ZuF6buR/fontsize/20/fill/I0VGRUZFRg==/dissolve/70/gravity/SouthEast/dx/10/dy/10|imageslim',
      filePath: path[0],
      name: 'file',
      header: { "Content-Type": "multipart/form-data" },
      formData: {
        session_key: wx.getStorageSync('session_key')
      },
      success: function (res) {
        if (res.statusCode != 200) {
          wx.showModal({
            title: '提示',
            content: '上传成功',
            showCancel: false
          })
          return;
        }
        var data = res.data
        page.setData({
          src: path[0]
        })
      },
      fail: function (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  previousTask () {
    let that = this
    wx.reLaunch({
      url: '../task/task?id=' + (Number(that.data.id) - 1)
    })
  },
  nextTask () {
    let that = this
    wx.reLaunch({
      url: '../task/task?id=' + (Number(that.data.id) + 1)
    })
  }
})
