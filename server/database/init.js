const mongoose = require('mongoose')
const db = 'mongodb://localhost/vue-mall'
const glob = require('glob')
const {resolve} = require('path')

exports.initSchemas = () => {
  glob.sync(resolve(__dirname, './schema', '**/*.js')).forEach(require)
}


exports.connect = () => {
  // 连接数据库
  mongoose.connect(db)

  let maxConnectTimes = 0

  //监听事件
  mongoose.connection.on('disconnected', () => {
    console.log('disconnected')
    if (maxConnectTimes <= 3) {
      maxConnectTimes++
      mongoose.connect(db)
      return
    }
    throw new Error('db error')
  }) 

  mongoose.connection.on('error', (err) => {
    if (maxConnectTimes <= 3) {
      maxConnectTimes++
      mongoose.connect(db)
      return
    }
    throw new Error('db error')
  })

  mongoose.connection.on('connected', () => {
    console.log('mongo connect success')
  })
}
