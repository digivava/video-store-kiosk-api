let router = require('express').Router()
let Controller = require('../controllers/movies')

router.get('/', function (req, res) {

  // req.headers['user-agent'] = 'blahblah Kindle'

  //thx dalethedeveloper for this helpful regex
  if (/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/.test(req.headers['user-agent'])) {
    req.query.size = 5
  }
  Controller.getAll(req.query, res.apiRespond)
})

router.get('/title/:title', function (req, res) {
  Controller.getByTitle(req.params.title, res.apiRespond)
})

module.exports = router
