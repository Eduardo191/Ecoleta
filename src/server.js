const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const port = 3000

server.use(express.json())
server.use(express.static('public'))

nunjucks.configure('src/views', {
  express: server,
  noCache: true
})

server.get('/', (req, res) => {
  return res.render('index.html', { title: 'Seu marketplace de coleta de resíduos' })
})

server.get('/create-point', (req, res) => {
  return res.render('create-point.html')
})

server.get('/search', (req, res) => {
  return res.render('search-results.html')
})

server.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})