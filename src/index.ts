import * as express from 'express';
import accionesRoutes from './routes/acciones-routers';

const app = express();
app.use(express.json());
app.use(accionesRoutes);
app.listen(4000);

console.log('Server on port', 4000);
