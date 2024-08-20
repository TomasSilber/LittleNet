import path from 'path';
import Product from '../models/product.js';

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const { name, price, description, category } = req.body;
        const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;

        // Validación simple
        if (!name || !price || !category) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        const newProduct = await Product.create({
            name,
            price,
            description,
            photo: imagePath ? path.basename(imagePath) : null, // Guarda la ruta de la imagen en la base de datos
            category,
            active: true,
        });

        return res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error al crear producto:', err);
        return res.status(500).send({ error: 'Error al crear producto', message: err.message });
    }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll();
        return res.status(200).json(products);
    } catch (err) {
        console.error('Error al obtener productos:', err);
        return res.status(500).send({ error: 'Error al obtener productos', message: err.message });
    }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productFromDB = await Product.findByPk(id);

        if (productFromDB) {
            return res.status(200).json(productFromDB);
        } else {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error('Error al obtener producto por ID:', err);
        return res.status(500).send({ error: 'Error al obtener producto por ID', message: err.message });
    }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, description, category } = req.body;
        const imagePath = req.file ? req.file.path.replace(/\\/g, '/') : null;

        // Validación simple
        if (!name || !price || !category) {
            return res.status(400).json({ error: 'Faltan campos requeridos' });
        }

        // Obtener el producto actual para no sobrescribir el campo photo si no se proporciona una nueva imagen
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const [updated] = await Product.update(
            { 
                name, 
                price, 
                description, 
                photo: imagePath ? path.basename(imagePath) : product.photo, // Mantener la imagen actual si no se proporciona una nueva
                category,
            },
            { where: { id } }
        );

        if (updated) {
            const updatedProduct = await Product.findByPk(id);
            return res.status(200).json(updatedProduct);
        } else {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error('Error al actualizar producto:', err);
        return res.status(500).json({ error: 'Error al actualizar producto', message: err.message });
    }
};

// Actualizar el estado del producto
export const updateProductStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { active } = req.body; // El estado activo debe ser enviado en el cuerpo de la solicitud

        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        // Actualizar solo el estado activo
        product.active = active;
        await product.save();

        return res.status(200).json(product);
    } catch (err) {
        console.error('Error al cambiar el estado del producto:', err);
        return res.status(500).json({ error: 'Error al cambiar el estado del producto', message: err.message });
    }
};

// Eliminar un producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Product.destroy({
            where: { id },
        });

        if (deleted) {
            return res.status(204).send();
        } else {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        return res.status(500).send({ error: 'Error al eliminar producto', message: err.message });
    }
};
