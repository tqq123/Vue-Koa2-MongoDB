const Router = require('koa-router')
const router = new Router()

const city = require('../data_json/city.json')

router.get('/city', ctx => {
  ctx.body = {
    code: 200,
    data: city
  }
})

module.exports = router