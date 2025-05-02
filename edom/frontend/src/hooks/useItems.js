import { useEffect, useState } from 'react';
import { getItems, deleteItem } from '../api/itemApi';

export function useItems(page = 1, limit = 20) {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchItems = async () => {
        setLoading(true);
        try {
            const res = await getItems(page, limit);
            setItems(res.data);
        } finally {
            setLoading(false);
        }
    };

    const removeItem = async (id) => {
        await deleteItem(id);
        setItems(items.filter(i => i._id !== id));
    };

    useEffect(() => {
        fetchItems();
    }, [page, limit]);

    return { items, loading, fetchItems, removeItem };
}