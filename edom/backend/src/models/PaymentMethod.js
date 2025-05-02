const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentMethodSchema = new Schema({
  name:        { type: String, required: true, unique: true }, // Ej.: 'Credit Card', 'PayPal' :contentReference[oaicite:4]{index=4}
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('PaymentMethod', paymentMethodSchema);