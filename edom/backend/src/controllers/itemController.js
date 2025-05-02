const itemService = require('../services/itemService');

exports.listItems = async (req, res) => {

    try {
        const data = await itemService.list(req.query.page, req.query.limit);
        res.json(data);

    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getItem = async (req, res) => {

    try {
        const item = await itemService.getById(req.params.id);
        res.json(item);
    
    } catch (e) { res.status(404).json({ message: e.message }); }
};

exports.createItem = async (req, res) => {

    try {
        const item = await itemService.create(req.body);
        res.status(201).json(item);

    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.updateItem = async (req, res) => {

    try {
        const item = await itemService.update(req.params.id, req.body);
        res.json(item);

    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.deleteItem = async (req, res) => {

    try {
        await itemService.delete(req.params.id);
        res.json({ message: 'Item eliminado' });
        
    } catch (e) { res.status(404).json({ message: e.message }); }
};