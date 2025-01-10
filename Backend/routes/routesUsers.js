const express = require('express');
const router = express.Router();

const usersController = require('../controllers/controllerUsers.js');
const { Auth } = require('../middlewares/verifyauthentification.js');

router.post('/login', usersController.login);
router.post('/signup', usersController.signup);
router.get('/logout', Auth, usersController.logout);
router.get('/cart', Auth, usersController.getCart);
router.post('/cart/:itemId/:quantity', Auth, usersController.addToCart);
router.delete('/cart/:itemId', Auth, usersController.removeFromCart);
router.patch('/cart/add/:itemId', Auth, usersController.addOneToCart);
router.patch('/cart/remove/:itemId', Auth, usersController.removeOneFromCart);
router.post('/checkout-single', usersController.checkoutSingleProduct);

module.exports = router;
