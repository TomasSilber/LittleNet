import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import "../styles/productList.css";

const ProductList = ({ products }) => {
    const navigate = useNavigate(); // Inicializa useNavigate

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`); // Redirigir a la página de detalles del producto
    };

    return (
        <div className="product-list">
            {products.map(product => (
                <div 
                    key={product.id} 
                    className="product-item" 
                    onClick={() => handleProductClick(product)}
                >
                    <img 
                        src={product.photo ? `/uploads/${product.photo.replace(/\\/g, '/')}` : '/default-image.jpg'} 
                        alt={product.name} 
                        className="product-image" 
/>

                    <h2 className="product-name">{product.name}</h2>
                    <span className="product-price">${product.price}</span>
                </div>
            ))}
        </div>
    );
};

export default ProductList;
