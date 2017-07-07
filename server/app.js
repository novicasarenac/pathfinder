const express = require('express');
const app = express();
const port = 9000;
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes')(app);

app.listen(port, function() {
  console.log('Application is running!');
});
