import { useForm } from 'react-hook-form';

export default function ItemForm({ onSubmit, defaultValues }) {
    const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white p-6 shadow rounded space-y-4">
            <div>
                <label className="block font-semibold mb-1">Nombre</label>
                <input {...register('name', { required: 'Nombre requerido' })} className="w-full border p-2 rounded" />
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div>
                <label className="block font-semibold mb-1">Descripción</label>
                <textarea {...register('description', { required: 'Descripción requerida' })} className="w-full border p-2 rounded" />
                {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
            <div>
                <label className="block font-semibold mb-1">Precio</label>
                <input type="number" step="0.01" {...register('price', { required: 'Precio requerido', min: 0 })} className="w-full border p-2 rounded" />
                {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
            </div>
            <div>
                <label className="block font-semibold mb-1">Descuento (%)</label>
                <input type="number" step="1" {...register('discount', { min: 0, max: 100 })} className="w-full border p-2 rounded" />
            </div>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Guardar</button>
        </form>
    );
}