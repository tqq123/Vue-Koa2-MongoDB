const mongoose = require('mongoose')
const Schema =  mongoose.Schema

const cityScheme = new Schema({
  id: {unique:true,type: String},
  spell: {type: String},
  name: {type: String}
})

mongoose.model('City', cityScheme)