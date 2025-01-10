const express = require('express');
const router = express.Router();

const itemController = require('../controllers/controllerItems.js');

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

const Item = require('../models/items.js');
const Category = require('../models/categories.js');

async function createItem() {
  try {
    // Récupérer l'ID de la catégorie "Cosmétiques"
    const category = await Category.findOne({ name: 'Bijoux' });
    if (!category) throw new Error('Catégorie non trouvée.');

    // Ajouter un nouvel item
    const newItem = new Item({
      name: 'Pearl & Cross',
      description:
        'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Provident quam nihil illum quibusdam, autem eum nobis, aliquid error quis labore sequi. Facere repudiandae quam iste! Illum, a dolor. Voluptas, exercitationem.',
      image: 'https://example.com/image.jpg',
      price: 69.99,
      reductedprice: 59.99,
      category: category._id, // Référence à la catégorie
      subcategory: 'Collier', // Nom de la sous-catégorie
      filters: [
        { name: 'Taille', value: '40' },
        { name: 'Matière', value: 'Argent' },
        { name: 'Genre', value: 'Homme' },
      ],
      promotion: true,
    });

    await newItem.save();
    console.log('Item ajouté avec succès:', newItem);
  } catch (error) {
    console.error('Erreur lors de l’ajout de l’item:', error.message);
  }
}

// createItem();

router.get('/getallitems', itemController.getAllItems);
router.get('/getallitemspagination', itemController.getAllItemsPagination);
router.get('/getcategories', itemController.getCategories);
router.get(
  '/getspecificcategories/:name',
  itemController.getSpecificCategories
);
router.get('/getsubcategories', itemController.getSubcategories);
router.get(
  '/getspecificsubcategories/:id',
  itemController.getSpecificSubcategories
);
router.get('/getspecificitem/:id', itemController.getSpecificItem);
router.get('/getspecificvariants/:id', itemController.getSpecificVariants);

module.exports = router;
