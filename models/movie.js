const app = require('../app')
const db = app.get('db')

// constructor
function Movie (data) {
  for (let key of Object.keys(data)) {
    this[key] = data[key]
  }
}

// class methods
Movie.fetch = function(options, callback) {
  // console.log(options)
  // console.log(options.size)
  //should change based on useragent headers from request

  let queryOptions = {
    order: 'title ASC',
    limit: options.size || 10
  }

  if (options.page) {
    queryOptions.offset = (options.page - 1) * queryOptions.limit
  }

  db.movies.find({}, queryOptions, function (error, results) {
    if (error) { callback(error, undefined); return }
    let movies = results.map(function(data) { return new Movie(data) })
    callback(null, movies)
  })
}

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
