const mongoose = require('mongoose');
// const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema(
  {
    // id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Veuillez fournir un email valide'], // Validation d'email
    },
    // firstname: { type: String, required: true },

    password: { type: String, required: true },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

// userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', userSchema);
