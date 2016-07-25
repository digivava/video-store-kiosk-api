const Movie = require('../../models/movie')
const fakeMovie = {
  title: "The Fake Movie",
  overview: "This movie is fake. Five stars",
  release_date: "1960-06-16",
  inventory: 10
}

const fakeMovie2 = {
  title: "The Test Movie",
  overview: "This movie is fake. Five stars",
  release_date: "1996-06-16",
  inventory: 20
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

  describe('.all', function () {
    beforeEach(function (done) {
      Movie.create(fakeMovie2, done)
    })

    describe('with no query options', function() {
      it('returns all movies in the database by default', function (done) {
        Movie.all({}, function(error, result) {
          expect(error).toBeNull()
          expect(result.length).toBe(2)
          done()
        })
      })

      it('returns an array of Movie instances', function (done) {
        Movie.all({}, function (error, result) {
          expect(error).toBeNull()

          result.forEach(function (item) {
            expect(item instanceof Movie).toBeTruthy()
          })

          done()
        })
      })
    })

    describe('with "c" query options', function () {
      it('uses the "c" option to determine how many Movies to return', function (done) {
        Movie.all({c: 1}, function (error, result) {
          expect(error).toBeNull()
          expect(result.length).toBe(1)

          done()
        })
      })
    })

    describe('with the "p" query options', function () {
      it('uses the "p" option to manage the record offset', function (done) {
        Movie.all({p: 2, c: 1}, function (error, result) {
          expect(error).toBeNull()

          expect(result.length).toBe(1)
          Object.keys(fakeMovie2).forEach(function (key) {
            if (key === 'release_date') {
              expect(new Date(fakeMovie2[key])).toEqual(result[0][key])
            } else {
              expect(fakeMovie2[key]).toBe(result[0][key])
            }
          })

          done()
        })
      })
    })
  })

  describe('.create', function () {
    it('returns an instance of Movie', function (done) {
      Movie.create(fakeMovie2, function (error, result) {
        expect(error).toBeNull()
        expect(result instanceof Movie).toBeTruthy()
        expect(result.id).toNotBe(null)

        done()
      })
    })

    it('returns a complete Movie object, with, like, an id and everything', function (done) {
      Movie.create(fakeMovie2, function (error, result) {
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
