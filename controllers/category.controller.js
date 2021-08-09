const { response, request } = require("express");
const CategoryModel = require("../models/category.model");


const getAllCategories = async (req = request, res = response) => {
  const {limit = 5, from = 0} = req.query;
  const query = {status:true};

  const [total, categories] = await Promise.all([
    CategoryModel.countDocuments(query),
    CategoryModel.find(query).populate('user', 'name').limit(Number(limit)).skip(Number(from))
  ]);

  return res.status(200).json({
    total,
    categories
  })

};


const getCategory = async (req, res = response) => {
  const id = req.params.id;

  const category = await CategoryModel.findById(id).populate('user', 'name');

  return res.json({
    category
  });
};

const addCategory = async (req =  request, res = response) => {
  const name = req.body.name.toUpperCase();
  const categoryDB = await CategoryModel.findOne({name});

  if (categoryDB) {
    return res.status(400).json({
      message: `Category ${name} already exist`,
    });
  }

  // Generate data before save
  const newCategory = {
    name,
    user: req.authUser._id
  }

  const category = new CategoryModel(newCategory);

  // Save in DB
  await category.save();

  return res.status(201).json({
    message: 'Category created',
    category
  });
}

const updateCategory = async (req, res = response) => {
  const id = req.params.id;
  const name = req.body.name.toUpperCase();

  // {new:true} is for show new data in te response
  const category = await CategoryModel.findByIdAndUpdate(id, {name}, {new:true});

  return res.json({
    message: 'Category updated',
    category
  });
};


const deleteCategory = async (req, res = response) => {
  const id = req.params.id;

  // Logical remove
  // {new:true} is for show new data in te response
  const category = await CategoryModel.findByIdAndUpdate(id, {status: false}, {new:true});

  res.json({
    message: 'category deleted',
    category,
  });
};

module.exports = {
  addCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
  getCategory,
}