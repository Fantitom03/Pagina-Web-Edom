const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Role = require('../models/Role');
const Permission = require('../models/Permission');

exports.authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
        if (err) return res.sendStatus(403);
        req.user = payload; // { id, role }
        next();
    });
};

exports.hasPermission = (permName) => async (req, res, next) => {
    const user = await User.findById(req.user.id).populate({
        path: 'role',
        populate: { path: 'permissions' }
    });
    const names = user.role.permissions.map(p => p.name);
    if (!names.includes(permName)) return res.sendStatus(403);
    next();
};

// Para rutas admin-only
exports.authorize = (roleName) => async (req, res, next) => {
    const user = await User.findById(req.user.id).populate('role');
    if (user.role.name !== roleName) return res.sendStatus(403);
    next();
};

exports.authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) return res.sendStatus(401);
        req.payload = verifyToken(token);
        next();
    } catch {
        res.sendStatus(403);
    }
};

exports.authorize = (roleName) => async (req, res, next) => {
    const user = await require('../models/User').findById(req.payload.id).populate('role');
    if (user.role.name !== roleName) return res.sendStatus(403);
    next();
};