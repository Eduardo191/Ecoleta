const express = require('express')
const nunjucks = require('nunjucks')
const db = require('./database/db')

const server = express()
const port = 3000

server.use(express.urlencoded({
  extended: true
}))
server.use(express.json())

server.use(express.static('public'))
nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

server.get('/', (req, res) => {
  return res.render('index.html', {
    title: 'Seu marketplace de coleta de resíduos'
  })
})

server.get('/create-point', (req, res) => {


  return res.render('create-point.html')
})

server.post('/savepoint', (req, res) => {
  const query = `
       INSERT INTO places (
         image,
         name,
         address,
         address2,
         state,
         city,
         items
       ) VALUES (?,?,?,?,?,?,?);
     `
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ]

  function afterInsertData(err) {
    if (err) {
      console.log(err)
      return res.render('create-point.html', { failed: true })  
    }

    console.log('Cadastrado com sucesso')
    console.log(this)

    return res.render('create-point.html', { saved: true })
  }

  db.run(query, values, afterInsertData)
})

server.get('/search', (req, res) => {
  const search = req.query.search

  if (search == '') {
    return res.render('search-results.html', { total: 0 })
  }

  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
    if (err) {
      console.log(err)
    }

    const total = rows.length
    return res.render('search-results.html', {
      places: rows,
      total
    })
  })
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})