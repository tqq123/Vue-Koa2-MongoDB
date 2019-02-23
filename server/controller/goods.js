const Router = require('koa-router')
const mongoose = require('mongoose')
const fs = require('fs')
let router = new Router()

// 存入数据库

router.get('/insertGoodsComments', ctx => {
  let data = require('../data_json/newcomments.json')
  let saveCount = 0
  const Comments = mongoose.model('Comments')
  data.map(item => {
    let newComments = new Comments(item)
    newComments.save().then(() => {
      saveCount ++
      console.log(saveCount)
    }).catch(err => {
      throw err
    })
  })
  console.log("导入评论成功")
  ctx.body = {code:200}
})

router.get('/insertAllGoodsInfo', async (ctx) => {
  fs.readFile('./data_json/newGoods.json', 'utf8', (err, data) => {
    if (err) throw err
    data = JSON.parse(data)
    let saveCount = 0
    const Goods = mongoose.model('Goods')
    data.map(item => {
      let newGoods = new Goods(item)
      newGoods.save().then(() => {
        saveCount ++
        console.log(saveCount)
      }).catch(err => {
        throw err
      })
    })
  })
  console.log("导入商品成功")
  ctx.body = {code:200}
})

router.get('/insertAllCategory', async (ctx) => {
  fs.readFile('./data_json/category.json', 'utf8', (err, data) => {
    if (err) throw err
    data = JSON.parse(data)
    let saveCount = 0
    const Category = mongoose.model('Category')
    data.RECORDS.map(item => {
      let newCategory = new Category(item)
      newCategory.save().then(() => {
        saveCount ++
        console.log(saveCount)
      }).catch(err => {
        throw err
      })
    })
  })
  console.log("导入分类成功")
  ctx.body = {code:200}
})

router.get('/insertAllCategorySub', async (ctx) => {
  fs.readFile('./data_json/category_sub.json', 'utf8', (err, data) => {
    if (err) throw err
    data = JSON.parse(data)
    let saveCount = 0
    const CategorySub = mongoose.model('CategorySub')
    data.RECORDS.map(item => {
      let newCategory = new CategorySub(item)
      newCategory.save().then(() => {
        saveCount ++
        console.log(saveCount)
      }).catch(err => {
        throw err
      })
    })
  })
  console.log("导入子分类成功")
  ctx.body = {code:200}
})

// 商品详情
router.post('/getDetailGoodsInfo', async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  let res = await Goods.findOne({ID: goodsId})
  ctx.body = {
    code: 200,
    message: res
  }
})

// 商品详情评论
router.post('/getDetailGoodsComments', async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  const Comments = mongoose.model('Comments')
  let res = await Comments.find()
  ctx.body = {
    code: 200,
    message: res
  }
})

// 所有商品列表
router.get('/getAllGoodsInfo', async (ctx) => {
  let goodsId = ctx.request.body.goodsId
  const Goods = mongoose.model('Goods')
  let res = await Goods.find()
  ctx.body = {
    code: 200,
    message: res
  }
})

// 商品大类
router.get('/getCategoryList', async (ctx) => {
  const Category = mongoose.model('Category')
  let res = await Category.find()
  ctx.body = {
    code: 200,
    message: res
  }
})

// 商品子类
router.post('/getCategorySubList', async (ctx) => {
  const categoryId = ctx.request.body.categoryId
  const CategorySub = mongoose.model('CategorySub')
  let res = await CategorySub.find({MALL_CATEGORY_ID: categoryId})
  ctx.body = {  
    code: 200,
    message: res
  }
})

// 商品列表
router.post('/getGoodsListByCategorySubId', async (ctx) => {
  const categorySubId = ctx.request.body.categorySubId
  let page = ctx.request.body.page   // 当前页数
  let num = 10    // 每页数量
  let startIndex = (page - 1) * num
  const Goods = mongoose.model('Goods')
  let res = await Goods.find({SUB_ID: categorySubId}).skip(startIndex).limit(num)  // 查询限制条件
  ctx.body = {
    code: 200,
    message: res
  }
})

module.exports = router