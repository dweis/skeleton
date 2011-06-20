var sys = require('sys')
  , exec = require('child_process').exec
  , spawn = require('child_process').spawn

var node_modules = 
    [ [ 'cluster', '0.6.4' ]
    , [ 'cluster-live', '0.0.3' ]
    , [ 'connect', '1.4.5' ]
    , [ 'connect-mongodb', '0.4.0' ]
    , [ 'express', '2.3.11' ]
    , [ 'jade', '0.12.2' ]
    , [ 'logging', '2.0.8' ]
    , [ 'mongoose', '1.4.0' ]
    , [ 'mongoose-types', '1.0.3' ]
    , [ 'everyauth', '0.2.9', ]
    , [ 'mongoose-auth', '0.0.10' ]
    , [ 'stylus', '0.13.3' ]
    , [ 'underscore', '1.1.6' ]
    , [ 'vows', '0.5.8' ]
    , [ 'nodemailer', '0.1.18' ]
    , [ 'async', '0.1.9' ]
    , [ 'request', '1.9.5' ] ]

desc('default task')
task('default', [ 'test' ], function() {
})

desc('run server')
task('server', [], function() {
  var server = spawn('node', ['server'])

  server.stdout.on('data', function(data) {
    process.stdout.write(data)
  })

  server.stderr.on('data', function(data) {
    process.stderr.write(data)
  })
})

desc('run all tests')
task('test', [], function() {
  process.env.NODE_ENV = "testing"

  var app = require('./app')
    , async = require('async')

  app.listen(3090)

  var testSuites = [ 
    'test/controllers/welcome.test.js'
    ]

  var success = true

  async.forEachSeries(testSuites, function(test, callback) {
	  var runner = spawn('node', [ 'node_modules/vows/bin/vows' , '--spec', test ])
	
	  runner.stdout.on('data', function(data) {
	    process.stdout.write(data)
	  })  
	
	  runner.stderr.on('data', function(data) {
	    process.stderr.write(data)
	  })  
	
	  runner.on('exit', function(code) {
      if (code) {
	      success = false
      }

      callback()
	  })
  }, 
  function(err) {
    process.exit(success ? 0 : 1)
  })
})

namespace('modules', function() {
  desc('list deps')
  task('show', [], function() {
    sys.puts(node_modules)
  })

  desc('install node.js modules with npm')
  task('install', [], function() {
    sys.puts('Installing node.js modules...')

    var modules_string = ''

    for (i in node_modules) {
      var module = node_modules[i][0]

      if (typeof node_modules[i][1] != 'undefined')
        module = module + '@' + node_modules[i][1]

      modules_string = modules_string + ' ' + module
    }

    var cmd = 'npm install ' + modules_string

    sys.puts('Executing command:')
    sys.puts(cmd)

    exec(cmd, function(error, stdout, stderr) {
      sys.puts(stdout)
    })
  })
})
