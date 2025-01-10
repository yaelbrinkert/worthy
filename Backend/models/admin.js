const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const adminSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    email: {
      type: String,
      required: true,
      match: [/.+@.+\..+/, "Veuillez fournir un email valide"], // Validation d'email
    },
    name: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // Ajoute createdAt et updatedAt automatiquement
  }
);

adminSchema.plugin(uniqueValidator);

module.exports = mongoose.model("admin", adminSchema);
