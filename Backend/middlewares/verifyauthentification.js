require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/users');

exports.Auth = async (req, res, next) => {
  const token = req.cookies.usertoken;
  if (!token) {
    // Si le token est manquant, renvoyez une réponse et arrêtez l'exécution
    return res.status(401).json({ error: 'Access denied', success: false });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    const user = await User.findById(req.userId);
    if (!user) {
      // Si l'utilisateur n'est pas trouvé, renvoyez une réponse et arrêtez l'exécution
      return res
        .status(401)
        .json({ message: 'Erreur, aucune donnée trouvée pour cet id:' });
    }

    // Si tout est OK, ajoutez les données utilisateur à `req` pour un usage ultérieur
    req.user = user;
    // Passez au prochain middleware ou contrôleur
    next();
  } catch (error) {
    // Si une erreur se produit, renvoyez une réponse et arrêtez l'exécution
    return res.status(401).json({ error: 'Invalid token: ' + error });
  }
};
