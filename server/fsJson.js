const fs = require('fs')

fs.readFile('./data_json/comments.json', 'utf8', (err, data) => {
  const newData = JSON.parse(data)
  const pushData = []
  newData.ratings.map(item => {
    let obj = {
      username: item.username,
      text: item.text,
      avatar: item.avatar
    }
    pushData.push(obj)
  })
  fs.writeFile('./data_json/newcomments.json', JSON.stringify(pushData), err => {
    if (err) throw err
  })
})