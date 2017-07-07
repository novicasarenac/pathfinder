module.exports = function(app) {
  var login = require('./controllers/login');
  app.get('/', login.login);
  app.get('/callback', login.callback);
};
