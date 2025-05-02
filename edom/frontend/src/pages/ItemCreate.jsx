import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createItem } from '../api/itemApi';
import ItemForm from '../components/ItemForm';

export default function ItemCreate() {
    const nav = useNavigate();
    const onSubmit = async data => {
        await createItem(data);
        nav('/items');
    };
    return <ItemForm onSubmit={onSubmit} defaultValues={{ name: '', description: '', price: 0, discount: 0 }} />;
}