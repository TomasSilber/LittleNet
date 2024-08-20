import { Router } from 'express';
import upload from '../config/multer.js'; // Importa la configuración de Multer
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    updateProductStatus, // Importa la función para actualizar el estado del producto
} from '../controllers/productController.js';

const router = Router();

// Crear un producto (incluye subida de imagen)
router.post('/', upload.single('photo'), createProduct);

// Obtener todos los productos
router.get('/', getAllProducts);

// Obtener un producto por ID
router.get('/:id', getProductById);

// Actualizar un producto (incluye Multer si necesitas actualizar la imagen)
router.put('/:id', upload.single('photo'), updateProduct);

// Actualizar el estado del producto (nueva ruta PATCH)
router.patch('/:id', updateProductStatus);

// Eliminar un producto
router.delete('/:id', deleteProduct);

export default router;
