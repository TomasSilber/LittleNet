import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './productForm';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [priceUpdateId, setPriceUpdateId] = useState(null);
  const [newPrice, setNewPrice] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (error) {
        setError('Error al cargar productos');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (updateMessage) {
      const timer = setTimeout(() => {
        setUpdateMessage('');
      }, 3000); // Limpia el mensaje después de 3 segundos

      return () => clearTimeout(timer);
    }
  }, [updateMessage]);

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post('/api/products', product);
      setProducts([...products, response.data]);
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  const handleUpdateProduct = async (id, updatedProduct) => {
    try {
      await axios.put(`/api/products/${id}`, updatedProduct);
      setProducts(products.map(p => (p.id === id ? updatedProduct : p)));
    } catch (error) {
      console.error('Error al actualizar producto:', error);
    }
  };

  const handleToggleProductStatus = async (id) => {
    try {
      const product = products.find(p => p.id === id);
      await axios.patch(`/api/products/${id}`, { active: !product.active });
      setProducts(products.map(p => 
        p.id === id ? { ...p, active: !p.active } : p
      ));
    } catch (error) {
      console.error('Error al cambiar el estado del producto:', error);
    }
  };

  const handlePriceChange = async (id) => {
    try {
      await axios.put(`/api/products/${id}`, { price: newPrice });
      setProducts(products.map(p => 
        p.id === id ? { ...p, price: newPrice } : p
      ));
      setUpdateMessage('¡Cambio realizado!');
      setNewPrice(''); // Limpiar el campo de entrada
    } catch (error) {
      console.error('Error al actualizar el precio:', error);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Panel de Administración</h1>
      <ProductForm onSubmit={handleAddProduct} />
      <div>
        <h2>Lista de Productos</h2>
        <ul>
          {products.map(product => (
            <li key={product.id}>
              <span>{product.name} - ${product.price}</span>
              <button onClick={() => handleToggleProductStatus(product.id)}>
                {product.active ? 'Deshabilitar' : 'Habilitar'}
              </button>
              <button onClick={() => { setPriceUpdateId(product.id); }}>
                Actualizar Precio
              </button>
              {priceUpdateId === product.id && (
                <div>
                  <input 
                    type="number" 
                    value={newPrice}
                    onChange={(e) => setNewPrice(e.target.value)}
                    placeholder="Nuevo precio"
                  />
                  <button onClick={() => handlePriceChange(product.id)}>
                    Actualizar
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
        {updateMessage && <p style={{ color: 'green' }}>{updateMessage}</p>}
      </div>
    </div>
  );
};

export default AdminPage;
