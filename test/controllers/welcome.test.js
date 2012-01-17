process.env.NODE_ENV = 'testing'

var vows = require('vows')
  , assert = require('assert')
  , request = require('request')
  , app = require('../../app')

app.listen(3090)

const BASE_URI = 'http://localhost:3090/'


vows
  .describe('Welcome Controller')

  .addBatch({
    'WHEN I visit the welcome page': { 
      topic: function() {
        request({ uri: BASE_URI,
          followRedirect: false }, this.callback)
      }
    , 'THEN I should feel welcomed':
      function(error, response, body) {
        assert.ok(body.match("welcome"))
      }
    , 'AND the response code should be 200':
      function(error, response, body) {
        assert.equal(response.statusCode, 200)
      }
    }
  })

  .export(module)
