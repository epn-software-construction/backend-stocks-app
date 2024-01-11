import { Router } from 'express';
import {
    getAllStocks,
    getUserStocks,
    createAcciones,
    updateAcciones,
    deleteAcciones,
} from '../controllers/acciones.controller';

const router = Router();

router.get('/user-stocks', getUserStocks);
router.get('/stocks', getAllStocks);
router.post('/user-stocks', createAcciones);
router.put('/acciones', updateAcciones);
router.delete('/acciones', deleteAcciones);

export default router;
