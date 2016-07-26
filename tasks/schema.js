let massive = require('massive')
let connectionString = "postgres://localhost/video-store-kiosk-api-"
let envs = ['development', 'test']
let complete = []

envs.forEach(function(env) {
  let db = massive.connectSync({ connectionString: connectionString + env })

  db.setup.schema([], function(error, res) {
    if (error) throw(error)

    console.log("created the " + env + " schema!")
    complete.push(env)

    if (complete.length === envs.length) process.exit()
  })  
})
