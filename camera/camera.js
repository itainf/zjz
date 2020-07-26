//https://developers.weixin.qq.com/miniprogram/dev/devtools/sandbox.html
//获取应用实例 
let app = getApp();
let wechat = require("../utils/wechat");
let strIp = "http://192.168.0.106:8013";    
Page({
  data: {
    device: true,
    tempImagePath: "", // 拍照的临时图片
    camera: false,
    ctx: {},
    type: "takePhoto",
    startRecord: false,
    time: 0,
    timeLoop: "",
    loadingHidden: true
  },
  onLoad(option) {
    console.log("onLoad")
    console.log(option.orgPage);
    self = this;
    //选择相册导入进入
    if (option.orgPage=="photo"){
      console.log("选择相册导入进入")
      var tempImagePath="";
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.on('acceptDataFromOpenerPage', function (data) {
        console.log(data.imagePath)
        tempImagePath = data.imagePath[0];
        console.log(tempImagePath)

  
        wechat.uploadFile(strIp + "/eam/fileLocal/upload", tempImagePath, "file")
          .then(d => {
            console.log(d);
            console.log(d.data);
            self.setData({
              tempImagePath: strIp + "/" + d.data,//res.tempImagePath,
              camera: false,
              loadingHidden: true
            });

          })
          .catch(e => {
            console.log(e);
          })
      })

      this.setData({
        camera: false,
        loadingHidden: false
      });
    }else{
      this.setData({
        ctx: wx.createCameraContext(),
        camera: true,
        type: 'takePhoto'
      })
    }
  },
  // 切换相机前后置摄像头  
  devicePosition() {
    this.setData({
      device: !this.data.device,
    })
    console.log("当前相机摄像头为:", this.data.device ? "后置" : "前置");
  },
  camera() {
    let { ctx, type, startRecord } = this.data;
    // 拍照  
    if (type == "takePhoto") {
      console.log("拍照");
      ctx.takePhoto({
        quality: "normal",
        success: (res) => {
          this.setData({
            camera: false,
            loadingHidden:false
          });
          wechat.uploadFile(strIp + "/eam/fileLocal/upload", res.tempImagePath, "file")
            .then(d => {
              console.log(d);
              console.log(d.data);
              var jsonstr = d.data
              console.log(d.data);
                  this.setData({
                    tempImagePath: strIp + "/" + d.data,//res.tempImagePath,
                    camera: false,
                    loadingHidden: true
                  });
              
            })
            .catch(e => {
              console.log(e);
            })
        },
        fail: (e) => {
          console.log(e);
        }
      })
    }
  },
  // 打开模拟的相机界面  
  open(e) {
    let { type } = e.target.dataset;
    console.log("开启相机准备", type == "takePhoto" ? "拍照" : "录视频");
    this.setData({
      camera: true,
      type:'takePhoto'
    })
  },
  // 关闭模拟的相机界面  
  close() {
    wx.redirectTo({
      url: '/photo/photo?id=1'
    })
    console.log("关闭相机");
    this.setData({
      camera: false
    })
  },
  onUnload: function () {
    console.log('返回------');
    wx.navigateBack({
      delta: 1
    })
  }
})  