require('dotenv').config();
const jsonwebtoken = require('jsonwebtoken');
const Bcrypt = require('bcryptjs');
const Cart = require('../models/basket');
const User = require('../models/users');
const Variants = require('../models/variants');
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Nom d'utilisateur incorrecte, veuillez réessayer",
      });
    }

    const valid = await Bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ message: 'Mot-de-passe incorrecte' });
    }

    // Génération du token
    const token = jsonwebtoken.sign(
      { id: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '24h' }
    );
    // Envoi du cookie
    res.cookie('usertoken', token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === 'production',
      secure: true,
      sameSite: 'None',
      maxAge: 24 * 60 * 60 * 1000,
    });
    // Réponse finale
    return res.status(200).json({ id: user._id, success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erreur serveur' });
  }
};

exports.signup = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const verificationpassword = req.body.verification_password;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  const userEmail = await User.findOne({ email });

  if (!email) {
    return res
      .status(401)
      .json({ message: 'Email non renseigné', success: false });
  }
  if (!password) {
    return res
      .status(401)
      .json({ message: 'Mot-de-passe non renseigné', success: false });
  }
  if (!verificationpassword) {
    return res
      .status(401)
      .json({ message: 'Mot-de-passe non renseigné', success: false });
  }
  if (!firstname) {
    return res
      .status(401)
      .json({ message: 'Prénom non renseigné', success: false });
  }
  if (!lastname) {
    return res
      .status(401)
      .json({ message: 'Nom de famille non renseigné', success: false });
  }
  if (!userEmail.email) {
    if (password === verificationpassword) {
      Bcrypt.hash(req.body.password, 12)
        .then((hash) => {
          const user = new User({
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: hash,
          });
          user
            .save()
            .then(() => {
              // Génération du token
              const token = jsonwebtoken.sign(
                { id: user._id },
                process.env.JWT_SECRET_KEY,
                { expiresIn: '24h' }
              );
              // Envoi du cookie
              res.cookie('usertoken', token, {
                httpOnly: true,
                // secure: process.env.NODE_ENV === 'production',
                secure: true,
                sameSite: 'Lax',
                maxAge: 24 * 60 * 60 * 1000,
              });
              // Réponse finale
              res
                .status(201)
                .json({ message: 'Utilisateur créé !', success: true });
            })
            .catch((error) => res.status(400).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    } else {
      return res.status(401).json({ message: 'Non authorisé', success: false });
    }
  } else {
    return res.status(401).json({
      message: 'Cet email est déjà utilisé, veuillez en choisir une autre.',
      success: false,
    });
  }
};

exports.logout = (req, res) => {
  return res
    .clearCookie('usertoken', {
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json({ message: 'Successfully logged out 😏 🍀' });
};

exports.getCart = async (req, res) => {
  try {
    const id = req.userId;
    const cart = await Cart.find({ id_user: id }).exec();
    res.status(200).json(cart);
  } catch (err) {
    console.error('Erreur:', err);
    res.status(500).json({ message: 'Erreur serveur ' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const id_user = req.userId;
    const id_variant = req.params.variantId;

    const getVariant = await Variants.findById(id_variant);
    // const id_item = req.params.itemId;
    const quantity = req.params.quantity;

    const existingItem = await Cart.findOne({
      id_user: id_user,
      id_variant: id_variant,
      id_item: getVariant.product_id,
    });
    if (existingItem) {
      const newQuantity = Number(existingItem.quantity) + Number(quantity);
      await Cart.updateOne(
        {
          id_user: id_user,
          id_variant: id_variant,
          id_item: getVariant.product_id,
        },
        { quantity: newQuantity }
      );
      res.status(200).json(existingItem);
    } else {
      const obj = {
        id_user: id_user,
        id_variant: id_variant,
        id_item: getVariant.product_id,
        quantity: quantity,
      };
      const cart = await Cart.create(obj);
      res.status(201).json(cart);
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout au panier:", err);
    res.status(500).json({ message: 'Erreur serveur', err });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const id_user = req.userId;
    const id_variant = req.params.variantId;

    await Cart.deleteOne({
      id_user: id_user,
      id_variant: id_variant,
    });
    res.status(200).json({ message: "L'élément a été supprimé" });
  } catch (err) {
    console.error('Erreur', err);
    res.status(500).json({ message: 'Erreur serveur', err });
  }
};

exports.addOneToCart = async (req, res) => {
  try {
    const id_user = req.userId;
    const id_variant = req.params.variantId;

    const existingItem = await Cart.findOne({
      id_user: id_user,
      id_variant: id_variant,
    });

    const id_item = existingItem.id_item;

    const newQuantity = Number(existingItem.quantity) + 1;
    await Cart.updateOne(
      { id_user: id_user, id_item: id_item, id_variant: id_variant },
      { quantity: newQuantity }
    );
    res.status(200).json(existingItem);
  } catch (err) {
    console.error("Erreur lors de l'ajout au panier:", err);
    res.status(500).json({ message: 'Erreur serveur', err });
  }
};

exports.removeOneFromCart = async (req, res) => {
  try {
    const id_user = req.userId;
    const id_variant = req.params.variantId;

    const existingItem = await Cart.findOne({
      id_user: id_user,
      id_variant: id_variant,
    });

    const id_item = existingItem.id_item;

    const newQuantity = Number(existingItem.quantity) - 1;
    if (newQuantity > 0) {
      await Cart.updateOne(
        { id_user: id_user, id_item: id_item, id_variant: id_variant },
        { quantity: newQuantity }
      );
      res.status(200).json(existingItem);
    } else if (newQuantity === 0 || newQuantity <= 0) {
      await Cart.deleteOne({
        id_user: id_user,
        id_variant: id_variant,
        id_item: id_item,
      });
      res.status(200).json(existingItem);
    }
  } catch (err) {
    console.error("Erreur lors de l'ajout au panier:", err);
    res.status(500).json({ message: 'Erreur serveur', err });
  }
};

const calculateOrderAmount = (items) => {
  // Calculate the order total on the server to prevent
  // people from directly manipulating the amount on the client
  let total = 0;
  items.forEach((item) => {
    total += item.amount;
  });
  return total;
};

exports.checkoutSingleProduct = async (req, res) => {
  try {
    const idOfProductVariant = req.body.id;
    const variant = await Variants.findById(idOfProductVariant);
    const priceVariant = variant.price;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: priceVariant,
      currency: 'eur',
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
