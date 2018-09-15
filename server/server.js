var express = require('express')
var axios = require('axios')

var compression = require('compression')

var app = express()
//开启gzip
app.use(compression())

const HomeData = require('./home.json')

// api 代理
var apiRoutes = express.Router()

apiRoutes.get('/index', (req, res) => {
  res.json({
    errno: 0,
    data: HomeData
  })
})

app.use('/api', apiRoutes)

app.use(express.static('./dist'));

app.listen(3000, err => {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening at http://localhost:3000')
})