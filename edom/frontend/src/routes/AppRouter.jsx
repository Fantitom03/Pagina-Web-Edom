import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ItemList from '../pages/ItemList';
import ItemCreate from '../pages/ItemCreate';
import ItemEdit from '../pages/ItemEdit';
import PrivateRoute from './PrivateRoute';

export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path="/items" element={<PrivateRoute><ItemList /></PrivateRoute>} />
            <Route path="/items/new" element={<PrivateRoute><ItemCreate /></PrivateRoute>} />
            <Route path="/items/edit/:id" element={<PrivateRoute><ItemEdit /></PrivateRoute>} />

            <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
    );
}