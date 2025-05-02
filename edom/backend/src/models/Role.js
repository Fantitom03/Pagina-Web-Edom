const mongoose = require('mongoose');
const { Schema } = mongoose;

const roleSchema = new Schema({
  name:        { type: String, required: true, unique: true }, // 'client', 'seller', 'admin' :contentReference[oaicite:6]{index=6}
  description: { type: String },
  permissions: [{ type: Schema.Types.ObjectId, ref: 'Permission' }]
}, { timestamps: true });

module.exports = mongoose.model('Role', roleSchema);