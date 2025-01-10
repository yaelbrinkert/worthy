const mongoose = require('mongoose');

const basketSchema = new mongoose.Schema({
  id_user: { type: String, required: true },
  id_item: { type: String, required: true },
  quantity: { type: Number, required: true },
});

module.exports = mongoose.model('baskets', basketSchema);
