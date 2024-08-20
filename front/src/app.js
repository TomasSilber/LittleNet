import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './pages/header.js'; 
import ProductList from './components/productList';
import Footer from './pages/footer.js';
import Detail from './components/detail.js'; 
import AdminPage from './components/admin/adminPage.js';
import Login from './components/admin/login.js';
import axios from 'axios';

function App() {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado de autenticación

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await axios.get('/api/products');
                setProducts(response.data);
                setFilteredProducts(response.data); // Inicializar con todos los productos
            } catch (error) {
                setError('Error fetching products');
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const handleSearchAndFilter = (searchTerm, filter) => {
        let updatedProducts = products;

        if (searchTerm) {
            updatedProducts = updatedProducts.filter(product => 
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (filter === 'service') {
            updatedProducts = updatedProducts.filter(product => product.isService);
        } else if (filter === 'product') {
            updatedProducts = updatedProducts.filter(product => !product.isService);
        }

        setFilteredProducts(updatedProducts);
    };

    const handleLogin = () => {
        setIsAuthenticated(true);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Router>
            <div className="App">
                <Header onSearch={handleSearchAndFilter} />
                <Routes>
                    <Route path="/" element={<ProductList products={filteredProducts} />} />
                    <Route path="/product/:id" element={<Detail />} />
                    <Route 
                        path="/admin" 
                        element={isAuthenticated ? <AdminPage /> : <Navigate to="/login" />} 
                    />
                    <Route 
                        path="/login" 
                        element={<Login onLogin={handleLogin} />} 
                    />
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
