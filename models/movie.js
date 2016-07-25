const app = require('../app')
const db = app.get('db')

// constructor
function Movie (data) {
  for (let key of Object.keys(data)) {
    this[key] = data[key]
  }
}

// class methods
Movie.findByTitle = function (title, callback) {
  db.movies.findOne({ title: title }, function (error, result) {
    if (error || !result) {
      callback(new Error("db error or missing movie", undefined))
      return
    }

    callback(null, new Movie(result))
  })
}

Movie.create = function (data, callback) {
  db.movies.save(data, function (error, result) {
    if (error) { callback(error, undefined); return }
    callback(null, new Movie(result))
  })
}

// attach housekeeping functions if we're in test
if(app.get('env') === 'test') {
  Movie.end = function () { db.end() }
  Movie.clean = function (callback) { db.setup.schema(callback) }
}

module.exports = Movie
