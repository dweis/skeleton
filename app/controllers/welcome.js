module.exports = function(app, models) {
  return {
    get: function(req, res) {
      res.render('welcome', {})
    }
  }
}
