const authService = require('../services/authService');
const { verifyToken } = require('../utils/token');

exports.register = async (req, res) => {

    try {
        const result = await authService.register(req.body);
        res.status(201).json(result);

    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.login = async (req, res) => {

    try {
        const result = await authService.login(req.body);
        res.json(result);

    } catch (e) { res.status(401).json({ message: e.message }); }
};

exports.assignRole = async (req, res) => {

    try {
        const { userId, roleName } = req.body;
        const user = await authService.assignRole({ userId, roleName });
        res.json({ message: 'Rol asignado', user });

    } catch (e) { res.status(400).json({ message: e.message }); }
};