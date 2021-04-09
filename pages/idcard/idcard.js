Page({
  
  shenfenzheng(){
    // 从相册中选择图片或拍照
    // 异步里面不能直接调用this 需要将that = this
    let that = this
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success (res) {
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths
          console.log("临时链接",tempFilePaths);
          // 调用uploadFile方法并传入路径，即tempFilePaths数组中的第一个元素
          that.uploadFile(tempFilePaths[0])
        }
      })
  },
  // 上传图片到云端 得到fileID
  // 外界调用uploadFile时需要传参数tempFile进来
  uploadFile(tempFile){
    let that = this
    wx.cloud.uploadFile({
      cloudPath: 'shenfenzheng.png',
      filePath: tempFile, // 文件路径
      success: res => {
        console.log("上传图片成功",res.fileID)
        that.getImgUrl(res.fileID)
      },
      fail: err => {
        console.log("上传图片失败",err)
      }
    })
  },
  // 得到fileID不够，我们还需要获取图片url，即云开发里图片里的下载地址
  getImgUrl(fileid){
    let that = this
    wx.cloud.getTempFileURL({
      fileList: [fileid],
      success: res => {
        let tempUrl = res.fileList[0].tempFileURL
        console.log("获取图片url成功",tempUrl)
        that.idcard(tempUrl)
      },
      fail: err => {
        console.log("获取图片url失败",err)
      }
    })
  },

  idcard(tempUrl){
    wx.cloud.callFunction({
      name:"shenfenzheng",
      data:{ 
          imgID:tempUrl
      },  
    // wx.cloud.callFunction({
    //   name: 'shenfenzheng',
    //   data: {
    //     strDemo: wx.cloud.CDN('shenfenzheng'),
    //     filePathDemo: wx.cloud.CDN({
    //       type: '身份证',
    //       filePath: 'tempUrl',
    //     })
    //   },
      success(res){
        console.log("识别成功",res);
      },
      fail(res){
        console.log("识别失败",res);
      }
    })
  }
})