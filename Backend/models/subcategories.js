const mongoose = require('mongoose');

const subcategoriesSchema = new mongoose.Schema({
  id_category: { type: String, required: true },
  name: { type: String, required: true },
});

module.exports = mongoose.model('subcategories', subcategoriesSchema);
