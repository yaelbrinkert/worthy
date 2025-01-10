const express = require('express');
const router = express.Router();

const candlesController = require('../controllers/controllerCandles.js');

router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

router.get('/getcandlespossibility', candlesController.getCandlesPossibility);
router.get(
  '/getspecificcandlepossibility/:id',
  candlesController.getSpecificCandlePossibility
);
router.post('/calculatePrice', candlesController.calculatePriceCandle);

module.exports = router;
