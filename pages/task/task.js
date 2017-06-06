import Config from '../../utils/config.js'
import QiniuUploader from '../../utils/qiniuUploader.js'

const SUCCESS = true

Page({
  data: {
      /*
       * 任务获取
       */
      task: {},
      taskArr: [],
      index: null,
      isShowPrev: true,
      isShowNext: false,
      /*
       * 文件上传操作
       */
      files: [],
      uptoken: '',
      disabledUpload: false,
      isDelete: true,

      /*
       * 任务完成状态
       */
      isComplete: true
  },
  onLoad (options) {
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      index: options.index,
      taskArr: wx.getStorageSync('task_arr')
    })
    this._getCompleteTask()
    this.getQiniuToken()
    this._isShowPrevBtn()
    this._isShowNextBtn()
  },
  onShow () {
    if (this.data.taskArr.length !== 0) {
      this._getTaskInfo()
    }
  },
  /*
   * 获取任务信息
   */
  _getTaskInfo () {
    let that = this
    wx.request({
      url: Config.host + 'task/show',
      method: 'POST',
      data: {
        session_key: wx.getStorageSync('session_key'),
        id: that.data.taskArr[that.data.index]
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success === SUCCESS) {
          that.setData({
            task: res.data.bizContent
          })
        }
      },
      complete () {
        wx.hideLoading()
      }
    })
  },

  /*
   * 用户做任务，上传任务
   */
  _doTask (files) {
    let that = this
    wx.request({
      url: Config.host + 'taskahead/create',
      method: 'POST',
      data: {
        session_key: wx.getStorageSync('session_key'),
        group_id: wx.getStorageSync('group_id'),
        term: wx.getStorageSync('term'),
        taskmanager_id: that.data.taskArr[that.data.index],
        image_path: JSON.stringify(files)
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success === SUCCESS) {
          that.setData({
            isComplete: false
          })
        }
      }
    })
  },
  _getCompleteTask () {
    let that = this
    wx.request({
      url: Config.host + 'taskahead/show',
      method: 'POST',
      data: {
        session_key: wx.getStorageSync('session_key'),
        group_id: wx.getStorageSync('group_id'),
        taskmanager_id: that.data.taskArr[that.data.index],
        term: wx.getStorageSync('term')
      },
      header: {'content-type':'application/x-www-form-urlencoded'},
      success (res){
        if (res.data.success === SUCCESS) {
          let image_path = res.data.bizContent.image_path
          if (image_path !== null) {
            that.setData({
              files: image_path,
              isComplete: false
            })
          }
        }
      }
    })
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
      let that = this
      wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album'],
      success (res) {
        const imageCtrl = '?imageMogr2/auto-orient/thumbnail/750x/format/jpg/interlace/1/blur/1x0/quality/75|watermark/2/text/bmFuYS1jcA==/font/5b6u6L2v6ZuF6buR/fontsize/20/fill/I0VGRUZFRg==/dissolve/70/gravity/SouthEast/dx/10/dy/10|imageslim'

        // for (let i = 0; i < res.tempFilePaths.length; i++) {
          let filePath = res.tempFilePaths[0];
          QiniuUploader.upload(filePath, (qiniuRes) => {
            that.setData({
              files: that.data.files.concat(qiniuRes.imageURL + imageCtrl),
              isComplete: false
            })
            that._doTask(that.data.files)
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
        // }

      }
    })
  },
  previewImage(e){
      wx.previewImage({
          current: e.currentTarget.dataset.src,
          urls: this.data.files
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
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  /*
   * 上一天任务和下一天任务操作
   */
  _isShowPrevBtn () {
    if (Number(this.data.index) === 0) {
      this.setData({
        isShowPrev: true
      })
    } else {
      this.setData({
        isShowPrev: false
      })
    }
  },
  _isShowNextBtn () {
    if (Number(this.data.index) === Number(this.data.taskArr.length - 1)) {
      this.setData({
        isShowNext: true
      })
    } else {
      this.setData({
        isShowNext: false
      })
    }
  },
  previousTask () {
    let that = this
    wx.redirectTo({
      url: '../task/task?index=' + (Number(that.data.index) - 1)
    })
  },
  nextTask () {
    let that = this
    wx.redirectTo({
      url: '../task/task?index=' + (Number(that.data.index) + 1)
    })
  },
  toIndex () {
    wx.switchTab({
      url: '../index/index'
    })
  }
})
