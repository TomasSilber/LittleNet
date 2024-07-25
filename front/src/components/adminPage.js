import React from 'react';
import ProductList from './components/ProductList';
import ProductForm from '../components/ProductForm';

const AdminPage = () => {
  return (
    <div>
      <h1>Admin Page</h1>
      <ProductForm />
      <ProductList />
    </div>
  );
};

export default AdminPage;
