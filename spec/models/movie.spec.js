const Movie = require('../../models/movie')
const fakeMovie = {
  title: "The Fake Movie",
  overview: "This movie is fake. Five stars",
  release_date: "1960-06-16",
  inventory: 10
}

describe('Movie', function () {
  beforeEach(function (done) {
    Movie.clean(function () {
      Movie.create(fakeMovie, done)
    })
  })

  afterEach(function () {
    Movie.end()
  })

  describe('.create', function () {
    let testMovie = {
      title: "The Test Movie",
      overview: "This movie is fake. Five stars",
      release_date: "1996-06-16",
      inventory: 20
    }

    it('returns an instance of Movie', function (done) {
      Movie.create(testMovie, function (error, result) {
        expect(error).toBeNull()
        expect(result instanceof Movie).toBeTruthy()
        expect(result.id).toNotBe(null)

        done()
      })
    })

    it('returns a complete Movie object, with, like, an id and everything', function (done) {
      Movie.create(testMovie, function (error, result) {
        expect(result instanceof Movie).toBeTruthy()
        
        expect(result.id).toNotBe(null)
        expect(result.title).toBe('The Test Movie')

        done()
      })
    })
  })

  describe('.findByTitle', function () {
    it('throws an error if no movie is found', function (done) {
      Movie.findByTitle('not found movie', function (error, result) {
        expect(error).toNotBe(null)
        expect(result).toBeUndefined()

        done()
      })
    })

    it('returns a Movie object when it finds a movie', function (done) {
      Movie.findByTitle('The Fake Movie', function (error, result) {
        expect(error).toBeNull()
        expect(result instanceof Movie).toBeTruthy()

        done()
      })
    })
  })
})
