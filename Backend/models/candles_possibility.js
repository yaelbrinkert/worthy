const mongoose = require('mongoose');

const candlesPossibilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  tailles: { type: Array, required: true },
});

module.exports = mongoose.model(
  'candles_possibility',
  candlesPossibilitySchema
);
