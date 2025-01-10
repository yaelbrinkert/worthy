// const pool = require("../config/database");
const Items = require('../models/items');
const Categories = require('../models/categories');
const Subcategories = require('../models/subcategories');
const Variants = require('../models/variants');

exports.getAllItems = async (req, res) => {
  try {
    const items = await Items.find();
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getAllItemsPagination = async (req, res) => {
  const limit = parseInt(req.query.limit) || 10; // Taille par page (paramétrable)
  const page = parseInt(req.query.page) || 1; // Page demandée
  const category = req.query.category;
  const promotion = req.query.promotion;
  const subcategory = req.query.subcategory;

  const filters = {};

  // if (sex) {
  //   const sexFilter = sex.split(',');
  //   filters.sex = { $in: sexFilter };
  // }
  if (category) {
    const categoryFilter = category.split(',');
    filters.id_category = { $in: categoryFilter };
  }
  if (promotion) {
    filters.promotion = { $in: promotion };
  }
  if (subcategory) {
    const subcategoryFilter = subcategory.split(',');
    filters.subcategory = { $in: subcategoryFilter };
  }

  try {
    // Nombre total d'éléments
    const totalItems = await Items.countDocuments(filters);

    // Récupération paginée des items
    const items = await Items.find(filters)
      .skip((page - 1) * limit)
      .limit(limit);

    // Métadonnées de pagination
    const pagination = {
      totalItems,
      currentPage: page,
      totalPages: Math.ceil(totalItems / limit),
      itemsPerPage: limit,
    };

    res.status(200).json({ items, pagination });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getCategories = async (req, res) => {
  try {
    const categories = await Categories.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getSpecificCategories = async (req, res) => {
  const nameQuery = req.params.name;
  try {
    const categories = await Categories.findOne({ name: nameQuery });
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategories.find();
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getSpecificSubcategories = async (req, res) => {
  const idCategory = req.params.id;
  try {
    const subcategories = await Subcategories.find({ id_category: idCategory });
    res.status(200).json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getSpecificItem = async (req, res) => {
  const idQuery = req.params.id;
  try {
    const product = await Items.findById(idQuery);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.getSpecificVariants = async (req, res) => {
  const idQuery = req.params.id;
  try {
    const variant = await Variants.find({ product_id: idQuery });
    res.status(200).json(variant);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
