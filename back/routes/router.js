import { Router } from 'express';
import productRoutes from './productRoutes.js';
import authRoutes from './authRoutes.js';

const router = Router();

router.use('/products', productRoutes); // Cambiado a use
router.use('/auth', authRoutes);

export default router;
