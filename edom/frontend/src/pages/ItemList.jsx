import React from 'react';
import { Link } from 'react-router-dom';
import { useItems } from '../hooks/useItems';
import { useAuth } from '../contexts/AuthContext';
import { can } from '../utils/permissions';

export default function ItemList() {
    const { items, loading, removeItem } = useItems();
    const { user } = useAuth();

    if (loading) return <p>Cargando...</p>;

    return (
        <div className="p-4">
            <div className="flex justify-between mb-4">
                <h1 className="text-2xl">Productos</h1>
                {can(user, 'create:items') &&
                    <Link to="/items/new" className="bg-blue-500 text-white px-4 py-2 rounded">
                        Nuevo Producto
                    </Link>
                }
            </div>
            <ul className="space-y-3">
                {items.map(item => (
                    <li key={item._id} className="bg-white p-4 shadow rounded flex justify-between">
                        <div>
                            <h2 className="font-semibold">{item.name}</h2>
                            <p>${item.finalPrice.toFixed(2)} <small className="line-through text-gray-500">${item.price.toFixed(2)}</small></p>
                        </div>
                        <div className="space-x-2">
                            {can(user, 'update:items') && <Link to={`/items/edit/${item._id}`} className="px-3 py-1 bg-yellow-400 rounded">Editar</Link>}
                            {can(user, 'delete:items') && <button onClick={() => removeItem(item._id)} className="px-3 py-1 bg-red-500 rounded">Borrar</button>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}