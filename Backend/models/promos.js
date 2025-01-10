const mongoose = require('mongoose');

const promoSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountPercentage: { type: Number, required: true }, // Réduction en %
  maxDiscount: { type: Number, default: 0 }, // Réduction maximale en €
  expirationDate: { type: Date, required: true }, // Date d'expiration
  active: { type: Boolean, default: true },
});

module.exports = mongoose.model('promos', promoSchema);
