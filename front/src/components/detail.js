import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/detail.css'; // Asegúrate de crear este archivo CSS

const Detail = () => {
    const { id } = useParams(); // Obtiene el ID del producto de la URL
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`/api/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                setError('Error fetching product details');
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div className="detail-container">
            <h1 className="detail-name">{product.name}</h1>
            <img src={product.photo} alt={product.name} className="detail-image" />
            <p className="detail-price">${product.price}</p>
            <p className="detail-description">{product.description}</p>
            <button 
                className="buy-button" 
                onClick={() => window.open(`https://wa.me/+5491123451351?text=Hola!%20me%20interesa%20este%20artículo!%20${product.name}`, '_blank')}
            >
                Comprar
            </button>
        </div>
    );
};

export default Detail;
