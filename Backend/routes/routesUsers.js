const express = require('express');
const router = express.Router();

const usersController = require('../controllers/controllerUsers.js');
const { Auth } = require('../middlewares/verifyauthentification.js');

router.post('/login', usersController.login);
router.post('/signup', usersController.signup);
router.get('/logout', Auth, usersController.logout);
router.get('/cart', Auth, usersController.getCart);
router.post('/cart/:variantId/:quantity', Auth, usersController.addToCart);
router.delete('/cart/:variantId', Auth, usersController.removeFromCart);
router.patch('/cart/add/:variantId', Auth, usersController.addOneToCart);
router.patch(
  '/cart/remove/:variantId',
  Auth,
  usersController.removeOneFromCart
);
router.post('/checkoutsingle', usersController.checkoutSingleProduct);

module.exports = router;
