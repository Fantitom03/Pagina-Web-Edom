const express = require('express');
const router  = express.Router();
const authCtrl= require('../controllers/authController');

// Registro y login normal
router.post('/register', authCtrl.register);
router.post('/login', authCtrl.login);

// Asignar rol de “seller” (solo admin)
router.put('/assign-role', authCtrl.authenticate, authCtrl.authorize('admin'), authCtrl.assignRole);

module.exports = router;