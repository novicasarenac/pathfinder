const express = require('express');
const app = express();
require('./routes')(app);

app.listen(config.port, function() {
  console.log('Application is running!');
});
