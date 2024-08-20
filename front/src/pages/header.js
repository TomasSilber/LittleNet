import React, { useState } from 'react';
import '../styles/header.css';
import logo from '../assets/Perfil_LittleNet.png';

const Header = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term, filter);
    };

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        onSearch(searchTerm, newFilter);
    };

    return (
        <header className="header">
            <div className="top-bar">
                <img src={logo} alt="Logo" className="logo" />
                <input 
                    type="text" 
                    placeholder="Buscar..." 
                    className="search-bar" 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
            <div className="filter-bar">
                <button onClick={() => handleFilterChange('all')}>Todos</button>
                <button onClick={() => handleFilterChange('service')}>Servicios</button>
                <button onClick={() => handleFilterChange('product')}>Productos</button>
            </div>
        </header>
    );
};

export default Header;
