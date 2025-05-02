const express = require('express');
const router  = express.Router();
const Item    = require('../models/Item');
const { authenticateToken, hasPermission } = require('../middleware/authMiddleware');

// GET /api/items
router.get('/', authenticateToken, hasPermission('read:items'), async (req, res) => {
  const items = await Item.find();
  res.json(items);
});

// GET /api/items/:id
router.get('/:id', authenticateToken, hasPermission('read:items'), async (req, res) => {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ message: 'Item no encontrado' });
  res.json(item);
});

// POST /api/items
router.post('/', authenticateToken, hasPermission('create:items'), async (req, res) => {
  const item = new Item(req.body);
  await item.save();
  res.status(201).json(item);
});

// PUT /api/items/:id
router.put('/:id', authenticateToken, hasPermission('update:items'), async (req, res) => {
  const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return res.status(404).json({ message: 'Item no encontrado' });
  res.json(item);
});

// DELETE /api/items/:id
router.delete('/:id', authenticateToken, hasPermission('delete:items'), async (req, res) => {
  await Item.findByIdAndDelete(req.params.id);
  res.json({ message: 'Item eliminado' });
});

module.exports = router;