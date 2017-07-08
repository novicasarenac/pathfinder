import express from 'express';
import bodyParser from 'body-parser';
import WebSocket from 'ws';
import routes from './routes';

const app = express();
const port = 9000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);
const wss = WebSocket.Server({ app });

app.listen(port, () => {
  console.log('Application is running!');
});

wss.on('connection', (ws, req) => {
  ws.on('message', (message) => {
    console.log(message);
  });

  ws.send('connected');
});
