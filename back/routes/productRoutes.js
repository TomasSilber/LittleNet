// src/routes/productRoutes.js
import { Router } from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} from '../controllers/productController.js';

const router = Router();

// Crear un producto
router.post('/', createProduct);

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Actualizar un producto
router.put('/:id', updateProduct);

// Eliminar un producto
router.delete('/:id', deleteProduct);

export default router;

