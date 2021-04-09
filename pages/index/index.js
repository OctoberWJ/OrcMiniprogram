Page({
  yinhangka(){
    let that = this;
    wx.cloud.callFunction({
      name:"yinhangka",
      data:{
        imgUrl:"https://7072-prod-1g6phc674b56c99f-1305492779.tcb.qcloud.la/%E9%93%B6%E8%A1%8C%E5%8D%A1.jpg?sign=773827532c3e178d46c54350eb345d11&t=1617621405"
      },  
      success(res){
        console.log("识别成功",res);
        that.setData({
          number:res.result.number
        })
      },
      fail(res){
        console.log("识别失败",res);
      }
    })
  }
})