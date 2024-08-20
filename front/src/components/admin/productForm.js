import React, { useState, useEffect } from 'react';
import '../../styles/productForm.css';

const ProductForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null); // Nuevo estado para la imagen
    const [category, setCategory] = useState('equipos y laptops'); // Valor por defecto para el primer select
    const [subCategory, setSubCategory] = useState('pc'); // Valor por defecto para el segundo select

    const categories = [
        'equipos y laptops',
        'procesadores',
        'placas madre',
        'placas de video',
        'memorias ram',
        'almacenamiento',
        'refrigeracion',
        'gabinetes',
        'monitores',
        'perifericos',
        'conectividad',
        'cables y adaptadores',
    ];

    const subCategories = {
        'equipos y laptops': ['pc', 'laptops', 'otros'],
        'procesadores': ['amd', 'intel'],
        'placas madre': ['intel', 'amd'],
        'placas de video': ['placa amd', 'placa geforce'],
        'memorias ram': ['memorias', 'memorias notebook', 'servidor'],
        'almacenamiento': ['discos rigidos', 'discos solidos'],
        'refrigeracion': ['coolers fan', 'coolers cpu', 'pasta termica'],
        'gabinetes': ['gabinetes', 'modding', 'cables', 'iluminacion', 'otros'],
        'monitores': ['monitores', 'pantallas'],
        'perifericos': ['auriculares', 'teclados', 'mouses', 'webcams', 'joysticks', 'mousepads', 'parlantes', 'combos de teclado mouses', 'otros', 'microfonos'],
        'conectividad': ['placas de red inalambricas', 'routers wifi'],
        'cables y adaptadores': ['microelectronica', 'scrap', 'repuestos'],
    };

    useEffect(() => {
        // Actualiza el subtipo cuando cambie la categoría
        setSubCategory(subCategories[category][0]);
    }, [category]);

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Verifica que haya una imagen seleccionada
        if (!image) {
            alert('Please select an image.');
            return;
        }

        // Crea un objeto FormData para enviar el archivo
        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('category', subCategory); // Guarda solo el subtipo
        if (image) {
            formData.append('photo', image);
        }

        onSubmit(formData); // Llama la función onSubmit con los datos del formulario

        // Restablece los campos del formulario
        setName('');
        setPrice('');
        setDescription('');
        setImage(null);
        setCategory('equipos y laptops'); // Restablece a la categoría predeterminada
        setSubCategory('pc'); // Restablece a la subcategoría predeterminada
    };

    return (
        <div className='product-form-container'>
            <form className='product-form' onSubmit={handleSubmit}>
                <div>
                    <label>Product Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input 
                        type="text" 
                        value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <textarea 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div>
                    <label>Upload Image:</label>
                    <input 
                        type="file" 
                        onChange={handleImageChange} 
                        accept="image/*" // Acepta solo imágenes
                    />
                </div>
                <div>
                    <label>Category:</label>
                    <select 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Subcategory:</label>
                    <select 
                        value={subCategory} 
                        onChange={(e) => setSubCategory(e.target.value)}
                    >
                        {subCategories[category].map(subCat => (
                            <option key={subCat} value={subCat}>
                                {subCat}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default ProductForm;
