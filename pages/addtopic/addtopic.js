Page({
  data: {
    /*
     * 文件上传操作
     */
    files: [],
    uptoken: '',
    disabledUpload: false,
    isDelete: true
  },
  onLoad () {
  },
  submit () {

  },
  /*
   * 获取图片上传 uptoken
   */
  getQiniuToken () {
    let that = this
    wx.request({
      url: Config.host + 'task/qiniu/token',
      method: 'POST',
      data: {
        session_key: wx.getStorageSync('session_key')
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success === SUCCESS) {
          that.setData({
            uptoken: res.data.bizContent
          })
        }
      }
    })
  },
  chooseImage (e) {
      var that = this
      wx.chooseImage({
      count: 9,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success (res) {
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
      success (res) {
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
      fail (e) {
        console.log(e);
        wx.showModal({
          title: '提示',
          content: '上传失败',
          showCancel: false
        })
      },
      complete () {
        wx.hideToast();
      }
    })
  },
})
