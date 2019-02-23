const Router = require('koa-router')
const mongoose = require('mongoose')

let router = new Router()

router.get('/', async (ctx) => {
  ctx.body = 'home'
})

router.post('/register', async (ctx) => {
  const User = mongoose.model('User')
  let newUser = new User(ctx.request.body)

  newUser.save().then(() => {
    ctx.body = {
      code: 200,
      message: '注册成功'
    }
  }).catch(e => {
    ctx.body = {
      code: 500,
      message: e  
    }
  })
})

router.post('/login', async (ctx) => {
  let loginUser = ctx.request.body
  let userName = loginUser.userName
  let password = loginUser.password

  const User = mongoose.model('User')
  // 比对用户名
  User.findOne({userName}).then(async (res) => {
    if (res) {
      let newUser = new User()
      await newUser.comparePassword(password, res.password).then(res => {
        ctx.body = {
          code: 200,
          message: res
        }
      }).catch(err => {
        ctx.body ={
          code: 500,
          message: err
        }
      })
    } else {
      ctx.body = {
        code: 200,
        message: res
      }
    }
  }).catch(err => {
    ctx.body = {
      code: 500,
      message: err
    }
  })
})

module.exports = router