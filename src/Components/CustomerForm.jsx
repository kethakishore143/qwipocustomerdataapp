import React, { useState, useEffect } from 'react';

function CustomerForm({ onSubmit, editingCustomer, onCancel }) {
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        phone: '',
        location: '',
    });

    useEffect(() => {
        if (editingCustomer) {
            setFormData(editingCustomer);
        }
    }, [editingCustomer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        setFormData({ name: '', age: '', phone: '', location: '' });
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <h3>{editingCustomer ? 'Edit Customer' : 'Add Customer'}</h3>
            <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                required
            />
            <button type="submit">{editingCustomer ? 'Update' : 'Add'}</button>
            {editingCustomer && (
                <button type="button" onClick={onCancel} style={{ marginLeft: '10px' }}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default CustomerForm;
