import { Router } from 'express';
import productRoutes from './productRoutes.js'; // Asegúrate de que esta ruta sea correcta

const router = Router();

// Rutas de productos
router.use('/api/products', productRoutes); // Esto significa que tus rutas de productos estarán en /api/products

export default router;
