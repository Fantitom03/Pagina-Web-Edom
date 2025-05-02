import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function Register() {
    const { register: regUser } = useAuth();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const nav = useNavigate();

    const onSubmit = async data => {
        await regUser(data.username, data.email, data.password);
        Swal.fire('¡Listo!', 'Usuario registrado', 'success');
        nav('/login');
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h2 className="text-2xl mb-4">Registrarse</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <input placeholder="Usuario" {...register('username', { required: true })}
                    className="w-full border p-2 rounded" />
                {errors.username && <p className="text-red-500">Usuario requerido</p>}
                <input type="email" placeholder="Email" {...register('email', { required: true })}
                    className="w-full border p-2 rounded" />
                {errors.email && <p className="text-red-500">Email requerido</p>}
                <input type="password" placeholder="Contraseña" {...register('password', { required: true })}
                    className="w-full border p-2 rounded" />
                {errors.password && <p className="text-red-500">Contraseña requerida</p>}
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded">Crear cuenta</button>
            </form>
        </div>
    );
}