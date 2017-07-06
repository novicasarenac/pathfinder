const express = require('express');
const app = express();
const config = require('./config');
require('./routes')(app);

app.listen(config.port, function() {
  console.log('Application is running!');
});
