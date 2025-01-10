const mongoose = require('mongoose');

const filterSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nom du filtre (ex: size, matter, gender)
  options: { type: [String], required: true }, // Liste des options disponibles pour ce filtre
});

const subcategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nom de la sous-catégorie (ex: Bague, Collier)
  filters: { type: [filterSchema], required: true }, // Liste des filtres associés à cette sous-catégorie
});

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Nom de la catégorie (ex: Bijoux)
  subcategories: { type: [subcategorySchema], required: true }, // Liste des sous-catégories avec leurs filtres
});

module.exports = mongoose.model('Category', categorySchema);
