const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const goodsScheme = new Schema({
  ID: {unique:true, type: String},
  GOODS_SERIAL_NUMBER: {type:String},
  SHOP_ID: {type:String},
  SUB_ID: {type:String},
  GOOD_TYPE: {type:Number},
  STATE: {type:Number},
  NAME: {type:String},
  ORI_PRICE: {type:Number},
  PRESENT_PRICE: {type:Number},
  AMOUNT: {type:Number},
  DETAIL: {type:String},
  BRIEF: {type:String},
  SALES_COUNT: {type:Number},
  IMAGE1: {type:String},
  IMAGE2: {type:String},
  IMAGE3: {type:String},
  IMAGE4: {type:String},
  IMAGE5: {type:String},
  ORIGIN_PLACE: {type:String},
  GOOD_SCENT: {type:String},
  CREATE_TIME: {type:String},
  UPDATE_TIME: {type:String},
  IS_RECOMMEND: {type:Number},
  PICTURE_COMPERSS_PATH: {type:String}
})

mongoose.model('Goods', goodsScheme)
