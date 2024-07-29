import Product from '../models/Product.js'; // Asegúrate de que el modelo Product esté importado correctamente

// Crear un nuevo producto
export const createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body); // Crear el producto en la base de datos
        return res.status(201).json(newProduct);
    } catch (err) {
        console.error('Error al crear producto:', err);
        return res.status(500).send(err.message);
    }
};

// Obtener todos los productos
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.findAll(); // Obtener todos los productos de la base de datos
        return res.status(200).json(products);
    } catch (err) {
        console.error('Error al obtener productos:', err);
        return res.status(500).send(err.message);
    }
};

// Obtener un producto por ID
export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const productFromDB = await Product.findByPk(id); // Buscar el producto en la base de datos

        if (productFromDB) {
            return res.status(200).json(productFromDB); // Devolver el producto si se encuentra
        } else {
            return res.status(404).json({ error: 'Product not found' }); // Manejo de error si no se encuentra
        }
    } catch (err) {
        console.error('Error al obtener producto por ID:', err);
        return res.status(500).send(err.message);
    }
};

// Actualizar un producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;

        // Actualiza el producto en la base de datos
        const [updated] = await Product.update(req.body, {
            where: { id },
        });

        // Verifica si el producto fue actualizado
        if (updated) {
            const updatedProduct = await Product.findByPk(id); // Obtener el producto actualizado
            return res.status(200).json(updatedProduct); // Devolver el producto actualizado
        } else {
            return res.status(404).json({ error: 'Product not found' }); // Manejo de error si no se encuentra
        }
    } catch (err) {
        console.error('Error al actualizar producto:', err);
        return res.status(500).json({ error: 'Internal Server Error', message: err.message }); // Devuelve un mensaje de error más estructurado
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
            return res.status(204).send(); // Devolver 204 si se eliminó correctamente
        } else {
            return res.status(404).json({ error: 'Product not found' });
        }
    } catch (err) {
        console.error('Error al eliminar producto:', err);
        return res.status(500).send(err.message);
    }
};
