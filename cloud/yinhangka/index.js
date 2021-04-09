// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    const result = await cloud.openapi.ocr.bankcard({
        type: 'photo',
        imgUrl: event.imgUrl
      })
    return result
  } catch (err) {
    return err
  }
}