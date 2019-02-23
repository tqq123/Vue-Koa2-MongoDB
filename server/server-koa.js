const Koa = require('koa')
const app = new Koa()
const {connect, initSchemas} = require('./database/init')
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require('koa-router')

app.use(bodyParser())
app.use(cors())

const user = require('./controller/user')
const goods = require('./controller/goods')

let router = new Router()

// 城市信息
const city = require('./data_json/city.json')

router.get('/city', ctx => {
  ctx.body = {
    code: 200,
    data: city
  }
})
// 装载子路由
router.use('/user', user.routes())
router.use('/goods', goods.routes())

// 加载路由中间件
app.use(router.routes())

app.use(router.allowedMethods())

connect()
initSchemas()
const Comments = mongoose.model('Comments')
Comments.remove({}, ()=>{})
const Goods = mongoose.model('Goods')
Goods.remove({}, ()=>{})
const Category = mongoose.model('Category')
Category.remove({}, ()=>{})
const CategorySub = mongoose.model('CategorySub')
CategorySub.remove({}, ()=>{})
// let tqq = new User({userName: 'tqq1', password: '123'})
// tqq.save().then(() => {
//   console.log('插入成功')
// })
// User.find().then(res => console.log(res))
const HomeData = require('./home.json')
app.use(async (ctx) => {
  ctx.body = {
    errno: 0,
    data: HomeData
  }
})

app.listen(3000, () => {
  console.log('Listening at http://localhost:3000')
})