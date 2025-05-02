const mongoose = require('mongoose');
const { Schema } = mongoose;

const itemSchema = new Schema({
  name:        { type: String, required: true },           // Nombre del electrodoméstico :contentReference[oaicite:0]{index=0}
  description: { type: String, required: true },           // Descripción detallada :contentReference[oaicite:1]{index=1}
  price:       { type: Number, required: true, min: 0 },   // Precio base :contentReference[oaicite:2]{index=2}
  discount:    { type: Number, min: 0, max: 100, default: 0 } // % de descuento (opcional) :contentReference[oaicite:3]{index=3}
}, { timestamps: true });

// Virtual para precio final con descuento
itemSchema.virtual('finalPrice').get(function() {
  return this.price * (1 - this.discount / 100);
});

module.exports = mongoose.model('Item', itemSchema);