const paymentService = require('../services/paymentService');

exports.listPayments = async (req, res) => {

    try {
        res.json(await paymentService.list());

    } catch (e) { res.status(500).json({ message: e.message }); }
};

exports.getPayment = async (req, res) => {

    try {
        res.json(await paymentService.getById(req.params.id));

    } catch (e) { res.status(404).json({ message: e.message }); }
};

exports.createPayment = async (req, res) => {

    try {
        const pm = await paymentService.create(req.body);
        res.status(201).json(pm);

    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.updatePayment = async (req, res) => {

    try {
        const pm = await paymentService.update(req.params.id, req.body);
        res.json(pm);

    } catch (e) { res.status(400).json({ message: e.message }); }
};

exports.deletePayment = async (req, res) => {

    try {
        await paymentService.delete(req.params.id);
        res.json({ message: 'Método de pago eliminado' });
        
    } catch (e) { res.status(404).json({ message: e.message }); }
};