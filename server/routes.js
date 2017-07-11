import login from './controllers/login';
import explorer from './controllers/explorer';

export default function routesExport(app) {
  app.post('/analysis', login);
  app.post('/explore', explorer);
}
