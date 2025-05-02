const express = require('express');
const router = express.Router();
const itemRouter = require('./itemRoutes');
const authRouter = require('./authRouter');

router.use('/items', itemRouter);
router.use('/auth', authRouter);

module.exports = router;