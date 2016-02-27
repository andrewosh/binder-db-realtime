var getDatabase = require('binder-db').getDatabase
var service = require('feathers-mongodb')
var feathers = require('feathers')
var socketio = require('feathers-socketio')
var rest = require('feathers-rest')
var errors = require('feathers-errors')
var bodyParser = require('body-parser')

const app = feathers()
  .configure(socketio())
  .configure(rest())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))

getDatabase(function (err, db) {
  if (err) {
    console.error('Could not connect to the binder database')
    process.exit(2)
  }
  app.use('/templates', service({
    Model: db.collection('templates')
  }))
  app.use('/apps', service({
    Model: db.collection('apps')
  }))
  app.use('/builds', service({
    Model: db.collection('builds')
  }))

  // app.use(errors.handler())

  var server = app.listen(2122)
  server.on('listening', function () {
    console.log('Feathers MongoDB service is running on port 2122')
  })
})
