import login from './controllers/login';

export default function routesExport(app) {
  app.post('/user', login);
}
