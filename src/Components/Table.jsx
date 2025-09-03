import React from 'react';

function Table({ customers, onEdit, onDelete }) {
    return (
        <table border="1" cellPadding="10" cellSpacing="0">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Phone</th>
                    <th>Location</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.length === 0 ? (
                    <tr><td colSpan="5">No customers found</td></tr>
                ) : (
                    customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.age}</td>
                            <td>{customer.phone}</td>
                            <td>{customer.location}</td>
                            <td>
                                <button onClick={() => onEdit(customer)}>Edit</button>
                                <button onClick={() => onDelete(customer.id)} style={{ marginLeft: '5px' }}>Delete</button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
}

export default Table;
