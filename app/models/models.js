module.exports = function(mongoose) {
  var application = require('../lib/application')
    , config = application.getConfig()
    , mongooseAuth = require('mongoose-auth')
    , log = require('logging').from(__filename)
    , Schema = mongoose.Schema
    , UserSchema
    , User

  UserSchema = new Schema({
      created: { type: Date, default: Date.now }
  })

  UserSchema.plugin(mongooseAuth, {
      everymodule: {
        everyauth: {
            User: function () {
              return User
            }
        }
      }

    , password: {
        loginWith: 'email'
      , everyauth: {
          getLoginPath: '/login'
        , postLoginPath: '/login'
        , loginView: 'login.jade'
        , getRegisterPath: '/register'
        , postRegisterPath: '/register'
        , registerView: 'register.jade'
        , loginSuccessRedirect: '/'
        , registerSuccessRedirect: '/'
      }
    }
  })

  User = mongoose.model('User', UserSchema)
}
