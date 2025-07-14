import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        pname: '',
        category_id: '',
        price: '',
        image_url: '',
        description: '',
    });

    // Fetch products
    useEffect(() => {
        axios.get('http://localhost:3000/api/products')
            .then((response) => setProducts(response.data))
            .catch((error) => console.error(error));
    }, []);

    // Handle form input
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Add product
    const handleAddProduct = (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/api/products', formData)
            .then((response) => {
                alert(response.data.message);
                setProducts([...products, { ...formData, pid: response.data.productId }]);
            })
            .catch((error) => console.error(error));
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <form onSubmit={handleAddProduct}>
                <input type="text" name="pname" placeholder="Product Name" onChange={handleChange} required />
                <input type="number" name="category_id" placeholder="Category ID" onChange={handleChange} required />
                <input type="number" name="price" placeholder="Price" onChange={handleChange} required />
                <input type="text" name="image_url" placeholder="Image URL" onChange={handleChange} required />
                <textarea name="description" placeholder="Description" onChange={handleChange}></textarea>
                <button type="submit">Add Product</button>
            </form>

            <h2>Products</h2>
            <ul>
                {products.map((product) => (
                    <li key={product.pid} style={{ listStyle: 'none', marginBottom: '20px' }}>
                        <img 
                            src={product.image_url} 
                            alt={product.pname} 
                            style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                        />
                        <div>
                            <strong>{product.pname}</strong> - ${product.price}
                        </div>
                        <p>{product.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
