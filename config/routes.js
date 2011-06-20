var NotFound = require('../app/lib/errors').NotFound

module.exports = function(app, models) { 
  var WelcomeController = require('../app/controllers/welcome')(app, models)

  // Welcome page
  app.get('/', WelcomeController.get)
  
  // 404
  app.all('*', function(req, res) {
    throw new NotFound('Page not found.')
  })  
}
