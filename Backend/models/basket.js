const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  id_user: { type: mongoose.Schema.Types.ObjectId, required: true },
  id_item: { type: mongoose.Schema.Types.ObjectId, required: true },
  id_variant: { type: mongoose.Schema.Types.ObjectId, required: true },
  options: { type: Array },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('baskets', basketSchema);
