// Asegúrate de sustituir los IDs por los reales de tu BD
export const roleMap = {
    'ID_CLIENT': {
        name: 'client',
        permissions: ['read:items']
    },
    'ID_SELLER': {
        name: 'seller',
        permissions: ['read:items', 'create:items', 'update:items']
    },
    'ID_ADMIN': {
        name: 'admin',
        permissions: ['read:items', 'create:items', 'update:items', 'delete:items', 'read:paymentMethods', 'create:paymentMethods']
    }
};