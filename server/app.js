import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./routes')(app);

app.listen(port, () => {
  console.log('Application is running!');
});
