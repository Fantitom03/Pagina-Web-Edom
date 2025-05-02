import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavBar() {
    const { user, logout } = useAuth();

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <Link to="/" className="text-lg font-bold">edom</Link>
            <div className="flex items-center space-x-4">
                {user ? (
                    <>
                        <span className="text-sm">Hola, {user.username}</span>
                        <Link to="/items" className="px-3 py-1 hover:underline">Tienda</Link>
                        {user.permissions.includes('create:items') && (
                            <Link to="/items/new" className="px-3 py-1 hover:underline">Nuevo Item</Link>
                        )}
                        <button onClick={logout} className="bg-red-600 px-3 py-1 rounded">Salir</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="bg-blue-600 px-3 py-1 rounded">Iniciar sesión</Link>
                        <Link to="/register" className="bg-green-600 px-3 py-1 rounded">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
}