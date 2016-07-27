# Project: Video Store Kiosk API
This is RESTful API buil with [NodeJS](https://nodejs.org/en/) and [Express](http://expressjs.com/). The goal of this API is to quickly serve information about the store's video collection. This repository provides two JSON datafiles to serve as the initial seeds for this system.

## Running the API
* clone the API to your machine
* install dependencies with `$ npm install`
* setup the project database using `$ npm run db:reset`
* start the node server using `$ npm start`
* send a GET request to `http://localhost:3000/`

## API Definition
Every endpoint serves `json` data.

#### Authentication
- This is an open API that assumes all users interacting with the API are video store employees.

#### Interface
- This part of the project is purely an API; all interactions should happen over HTTP requests. There is no front-end, user-facing interface.

#### Movies
- Retrieve a list of all movies (`/`)
- Retrieves a 'page' of movies by supplying _page_ and _size_ query parameters (`/?page=2&size=10`)
- Retrieve information on a single movie by title (`/title/Jaws`)
- Whether retrieved in a collection or singularly, every Movie has these properties:
  - `id`
  - `title`
  - `release_date`
  - `overview`
  - `inventory`
  - `poster_filename`
