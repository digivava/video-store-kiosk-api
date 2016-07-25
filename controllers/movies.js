function MovieController () {
  this.model = require('../models/movie')
}

MovieController.prototype.getAll = function (options, callback) {
  this.model.fetch(options, callback)
}

MovieController.prototype.getByTitle = function (title, callback) {
  this.model.findByTitle(title, callback)
}

module.exports = new MovieController()
