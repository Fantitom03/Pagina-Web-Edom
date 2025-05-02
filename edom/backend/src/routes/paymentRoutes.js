const express = require('express');
const router  = express.Router();
const PM      = require('../models/PaymentMethod');
const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');

router.get('/',  authenticateToken, hasPermission('read:paymentMethods'), async (req, res) => {
  res.json(await PM.find());
});
router.post('/', authenticateToken, hasPermission('create:paymentMethods'), async (req, res) => {
  const pm = new PM(req.body);
  await pm.save();
  res.status(201).json(pm);
});
router.put('/:id', authenticateToken, hasPermission('update:paymentMethods'), async (req, res) => {
  const pm = await PM.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(pm);
});
router.delete('/:id', authenticateToken, hasPermission('delete:paymentMethods'), async (req, res) => {
  await PM.findByIdAndDelete(req.params.id);
  res.json({ message: 'Método de pago eliminado' });
});

module.exports = router;