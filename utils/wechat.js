
var wechat = {
  uploadFile(url, filePath, name, formData = { openid: "test" }) {
  return new Promise((resolve, reject) => {
      let opts = { url, filePath, name, formData, header: { 'Content-Type': "multipart/form-data" }, success: resolve, fail: reject };
      wx.uploadFile(opts);
    });
  }  
}

module.exports = wechat;