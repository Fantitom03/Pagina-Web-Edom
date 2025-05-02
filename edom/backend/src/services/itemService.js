const Item = require('../models/Item');

class ItemService {
    async list(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const items = await Item.find().skip(skip).limit(limit);
        const total = await Item.countDocuments();

        return { items, pagination: { page, totalPages: Math.ceil(total / limit), total } };
    }

    async getById(id) {
        const item = await Item.findById(id);
        if (!item) throw new Error('Item no encontrado');

        return item;
    }

    async create(data) {
        const item = new Item(data);
        await item.save();

        return item;
    }

    async update(id, data) {
        const item = await Item.findByIdAndUpdate(id, data, { new: true });
        if (!item) throw new Error('Item no encontrado');

        return item;
    }

    async delete(id) {
        const item = await Item.findByIdAndDelete(id);
        if (!item) throw new Error('Item no encontrado');
        
        return item;
    }
}

module.exports = new ItemService();