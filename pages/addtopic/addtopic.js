import Config from '../../utils/config.js'
import Verify from '../../utils/verify.js'
import QiniuUploader from '../../utils/qiniuUploader.js'

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
    this.getQiniuToken()
  },
  submit (event) {
    let that = this,
        title = event.detail.value.title,
        body = event.detail.value.body,
        description = body,
        titleVerify = Verify.topicTitleVerify(title),
        bodyVerify = Verify.topicBodyVerify(body)
    if (titleVerify.status && bodyVerify.status) {
      wx.showLoading({
        title: '操作中'
      })
      wx.request({
        url: Config.host + 'topic/create',
        data: {
          session_key: wx.getStorageSync('session_key'),
          title,
          description,
          body,
          image_path: JSON.stringify(that.data.viewFiles),
          thumbnail_pic: JSON.stringify(that.data.files)
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
    } else {
      wx.showToast({
        title: titleVerify.text,
        duration: 2000
      })
      wx.showToast({
        title: bodyVerify.text,
        duration: 2000
      })
    }
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
        if (res.data.success) {
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
      success (res) {
        const imageCtrl = '?imageMogr2/auto-orient/thumbnail/750x/blur/1x0/quality/75|watermark/2/text/bmFuYS1jcA==/font/5b6u6L2v6ZuF6buR/fontsize/20/fill/I0VGRUZFRg==/dissolve/70/gravity/SouthEast/dx/10/dy/10|imageslim'
        const imageThumCtrl = '?imageView2/1/w/180/h/180/format/jpg/interlace/1/q/60|imageslim'
        wx.showLoading({
          title: '图片上传中'
        })

        for (let i = 0; i < res.tempFilePaths.length; i++) {
          let filePath = res.tempFilePaths[i];
          QiniuUploader.upload(filePath, (qiniuRes) => {
            that.setData({
              viewFiles: that.data.viewFiles.concat(qiniuRes.imageURL + imageCtrl),
              files: that.data.files.concat(qiniuRes.imageURL + imageThumCtrl)
            })

            if (that.data.files.length >= 9) {
              that.setData({
                disabledUpload: true
              })
            }
          },
          (error) => {
  		        console.log('error: ' + error);
          },
          {
            uploadURL: 'https://upload-z1.qbox.me',
            domain: 'http://images.nanafly.com/',
            uptoken: that.data.uptoken
          })
        }
        wx.hideLoading()
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
  previewImage(e){
    wx.previewImage({
        current: e.currentTarget.id, // 当前显示图片的http链接
        urls: this.data.files // 需要预览的图片http链接列表
    })
  },
})
