const Candles = require('../models/candles_possibility');

exports.getCandlesPossibility = async (req, res) => {
  try {
    const candlespossibilty = await Candles.find();
    res.status(200).json(candlespossibilty);
  } catch (err) {
    res.status(500).json({ message: 'Erreur' + err });
  }
};

exports.getSpecificCandlePossibility = async (req, res) => {
  const idChosen = req.params.id;
  try {
    const candlepossiblity = await Candles.findById(idChosen);
    res.status(200).json(candlepossiblity);
  } catch (err) {
    res.status(500).json({ message: 'Erreur' + err });
  }
};

exports.calculatePriceCandle = async (req, res) => {};
