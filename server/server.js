import express from 'express';
import bodyParser from 'body-parser';
import WebSocket from 'ws';
import cors from 'cors';
import routes from './routes';

const app = express();
const port = 9000;
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);

const server = app.listen(port, () => {
  console.log('Application is running!');
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => { // eslint-disable-line
  const ultron = ws['_ultron']; // eslint-disable-line

  ws.on('message', (message) => {
    console.log(message);
  });

  ws.send(JSON.stringify({ type: 'CONNECTED', id: ultron.id }));
});
