const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'items',
    required: true,
  },
  attributes: {
    type: Map,
    of: String,
    required: true,
  },
  price: { type: Number, required: true },
  reducted_price: {
    type: Number,
    required: true,
  },
  stocks: {
    type: Number,
    required: true,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp de création
  },
  updatedAt: {
    type: Date,
    default: Date.now, // Timestamp de mise à jour
  },
});

variantSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Variant', variantSchema);
