const User = require('../models/User');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/token');

class AuthService {
    async register({ username, email, password }) {
        const exists = await User.findOne({ $or: [{ email }, { username }] });

        if (exists) throw new Error('Usuario o email ya existe');

        const hashed = await bcrypt.hash(password, 10);
        const defaultRole = await Role.findOne({ name: 'client' });

        if (!defaultRole) throw new Error('Rol por defecto no encontrado');

        const user = new User({ username, email, password: hashed, role: defaultRole._id });
        
        await user.save();

        const userObj = user.toObject(); delete userObj.password;
        const token = generateToken({ id: user._id, role: user.role });
        
        return { user: userObj, token };
    }

    async login({ email, password }) {

        const user = await User.findOne({ email });

        if (!user) throw new Error('Usuario no encontrado');

        const valid = await bcrypt.compare(password, user.password);

        if (!valid) throw new Error('Credenciales inválidas');

        const userObj = user.toObject(); delete userObj.password;
        const token = generateToken({ id: user._id, role: user.role });

        return { user: userObj, token };
    }

    async assignRole({ userId, roleName }) {
        const user = await User.findById(userId);

        if (!user) throw new Error('Usuario no encontrado');

        const role = await Role.findOne({ name: roleName });

        if (!role) throw new Error('Rol no encontrado');

        user.role = role._id;
        await user.save();
        
        return user;
    }
}

module.exports = new AuthService();