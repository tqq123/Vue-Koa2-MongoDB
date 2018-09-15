const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const commentsScheme = new Schema({
  'username': {type:String},
  'text': {type:String},
  'avatar': {type:String}
})

mongoose.model('Comments', commentsScheme)