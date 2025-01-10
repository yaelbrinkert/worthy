const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Nom de l'item
    description: { type: String, required: true }, // Description de l'item
    image: { type: Array, required: true }, // URL de l'image
    id_category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    }, // Référence à une catégorie
    subcategory: { type: String, required: true }, // Nom de la sous-catégorie
    variants: { type: Array, required: true },
    promotion: { type: Boolean, default: false }, // Promotion active ou non
  },
  {
    timestamps: true, // Ajoute automatiquement `createdAt` et `updatedAt`
  }
);

module.exports = mongoose.model('items', itemSchema);
