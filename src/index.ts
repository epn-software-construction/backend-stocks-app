import * as express from 'express';
import accionesRoutes from './routes/acciones-routers';

import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(accionesRoutes);
app.listen(PORT);

console.log(`Server running on port ${PORT}`);
