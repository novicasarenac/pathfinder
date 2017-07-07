import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes';

const app = express();
const port = 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

app.listen(port, () => {
  console.log('Application is running!');
});
