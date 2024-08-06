import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        description: '',
        image_url: ''
    });

    const inputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const onSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3005/productsx', formData);
            console.log(response.data);
            setIsOpen(false);
            alert('Product added successfully!');
        } catch (error) {
            console.error('Failed to add product:', error);
            alert('Failed to add product. Please try again.');
        }
    };

    return (
        <>
            <button className="btn bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-semibold py-2 px-4 rounded-xl shadow-md transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-300" onClick={() => setIsOpen(true)}>Add Product</button>
            {isOpen && (
                <div className="modal modal-open">
                    <div className="modal-box relative">
                        <label className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setIsOpen(false)}>✕</label>
                        <h3 className="text-lg font-bold">Add New Product</h3>
                        <form onSubmit={onSubmit} className="py-4">
                            <input type="text" placeholder="Name" name="name" className="input input-bordered w-full mb-3" value={formData.name} onChange={inputChange} required />
                            <input type="text" placeholder="Price" name="price" className="input input-bordered w-full mb-3" value={formData.price} onChange={inputChange} required />
                            <textarea placeholder="Description" name="description" className="textarea textarea-bordered w-full mb-3" value={formData.description} onChange={inputChange} required></textarea>
                            <input type="url" placeholder="Image URL" name="image_url" className="input input-bordered w-full mb-3" value={formData.image_url} onChange={inputChange} required />
                            <button type="submit" className="btn btn-primary w-full">Submit</button>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddProduct;
