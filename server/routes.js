module.exports = function(app) {
  var login = require('./controllers/login');
  app.post('/user', login.login);
};
