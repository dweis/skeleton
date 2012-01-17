var application = require('./app/lib/application')
  , config = application.getConfig()
  , express = require('express')
  , stylus = require('stylus')
  , jade = require('jade')
  , mongoose = require('mongoose')
  , mongooseAuth = require('mongoose-auth')
  , helpers = require('./app/helpers/helpers')
  , log = require('logging').from(__filename)
  , NotFound = require('./app/lib/errors').NotFound
  , app = express.createServer() 

require(__dirname + '/app/models/models')(mongoose)

mongoose.connect('mongodb://localhost/' + config.database)


app.use(stylus.middleware({ src: __dirname + '/app'
                          , dest: __dirname + '/public'
                          , compress: true
                          , debug: config.jadeDebug }))

app.configure(function(){
  app.use(express.static(__dirname + '/public'))
  app.use(require('express-blocks'))
  app.use(express.bodyParser())
  app.use(express.cookieParser())
  app.use(express.methodOverride())
  app.use(express.session({ secret: config.sessionSecret }))
  app.use(mongooseAuth.middleware())

  app.dynamicHelpers(helpers.dynamicHelpers)
  app.helpers(helpers.helpers)

  app.set('view engine', 'jade')
  app.set('views', __dirname + '/app/views');
})

app.configure('development', function() {
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }))
  app.set('view cache', false)
})

app.configure('production', function() {
  const oneYear = 31557600000
  app.use(express.static(__dirname + '/public', { maxAge: oneYear }))
  app.use(express.errorHandler())
  app.set('view cache', true)
})

require('./config/routes')(app, mongoose)

app.error(function(err, req, res, next){
  if (err instanceof NotFound) {
    res.render('404', { status: 404 })
  } else {
    res.render('500', { status: 500 })

    if (err instanceof Error) {
      log(err.stack)
    } else {
      log(err)
    }
  }
})

mongooseAuth.helpExpress(app)

module.exports = app
