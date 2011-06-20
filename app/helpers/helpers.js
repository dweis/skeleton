var application = require('../lib/application')
  , config = application.getConfig()

exports.dynamicHelpers = {
  flash_error: function(req, res) {
    try {
      return req.flash('error')
    } catch (e) {
      return []
    }   
  },  

  flash_info: function(req, res) {
    try {
      return req.flash('info')
    } catch (e) {
      return []
    }   
  },  
}

exports.helpers = {
  site_name: function() {
    return config.siteName
  }
}
