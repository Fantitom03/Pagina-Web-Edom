import { createContext, useContext, useEffect, useState } from 'react';
import api, { loginUser, registerUser } from '../api/itemApi';
import jwtDecode from 'jwt-decode';
import { roleMap } from '../utils/roleMap';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (token && savedUser) {
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = async (email, password) => {
        const res = await loginUser({ email, password });
        const { token, user: rawUser } = res.data;
        const decoded = jwtDecode(token);
        const { name: roleName, permissions } = roleMap[decoded.role] || {};
        const enriched = { ...rawUser, role: roleName, permissions };
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(enriched));
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(enriched);
        return enriched;
    };

    const register = async (username, email, password) => {
        const res = await registerUser({ username, email, password });
        // tras registro, puede login automático o redirigir al login
        return res.data;
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete api.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);