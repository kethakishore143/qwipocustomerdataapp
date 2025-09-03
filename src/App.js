import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Pagination from "./Components/Pagination.jsx";
import Search from "./Components/Search.jsx";
import Sort from "./Components/Sort.jsx";
import Table from "./Components/Table.jsx";
import CustomerForm from "./Components/CustomerForm.jsx";

import './App.css';

function App() {
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('sno');
    const [sortOrder, setSortOrder] = useState('asc');
    const [editingCustomer, setEditingCustomer] = useState(null);

    const fetchData = useCallback(async () => {
    try {
        const response = await axios.get('http://localhost:3001/api/customers', {
            params: { searchTerm, sortBy, sortOrder, page: currentPage }
        });
        setCustomers(response.data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}, [searchTerm, sortBy, sortOrder, currentPage]);

useEffect(() => {
    fetchData();
}, [fetchData]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleSortChange = (sortByColumn, sortOrder) => {
        setSortBy(sortByColumn);
        setSortOrder(sortOrder);
    };

    const handleFormSubmit = async (customer) => {
        try {
            if (editingCustomer) {
                // UPDATE
               await axios.put(`http://localhost:3001/api/customers/${editingCustomer.sno}`, customer);
            } else {
                // CREATE
                await axios.post('http://localhost:3001/api/customers', customer);
            }
            setEditingCustomer(null);
            fetchData();
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer);
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/api/customers/${id}`);
            fetchData();
        } catch (error) {
            console.error('Error deleting customer:', error);
        }
    };

    const handleCancelEdit = () => {
        setEditingCustomer(null);
    };

    return (
        <div className="App" style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Customer Data</h1>
            <CustomerForm
                onSubmit={handleFormSubmit}
                editingCustomer={editingCustomer}
                onCancel={handleCancelEdit}
            />
            <Search onSearch={handleSearch} />
            <Sort onSort={handleSortChange} />
            <div className='tableview'>
            <Table customers={customers} onEdit={handleEdit} onDelete={handleDelete} />
            <Pagination currentPage={currentPage} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}

export default App;
