// pages/photo/photo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  takePhoto() {
    wx.navigateTo({
      url: '/camera/camera?id=1'
    })
  },
  chooseImage(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
      
        // tempFilePath可以作为img标签的src属性显示图片
        const tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
       
        wx.navigateTo({
          url: '/camera/camera?orgPage=photo',
          success: function (res) {
            // 通过eventChannel向被打开页面传送数据
            res.eventChannel.emit('acceptDataFromOpenerPage', { imagePath: tempFilePaths})
          }
        })

      }
    })
  }
})