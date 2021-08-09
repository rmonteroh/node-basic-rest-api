const { response, request } = require("express");
const ProductModel = require("../models/product.model");


const getAllProducts = async (req = request, res = response) => {
  const {limit = 5, from = 0} = req.query;
  const query = {status:true};

  const [total, products] = await Promise.all([
    ProductModel.countDocuments(query),
    ProductModel.find(query)
      .populate('user', 'name')
      .populate('category', 'name')
      .limit(Number(limit))
      .skip(Number(from))
  ]);

  return res.status(200).json({
    total,
    products
  })

};


const getProduct = async (req, res = response) => {
  const id = req.params.id;

  const product = await ProductModel.findById(id).populate('user', 'name').populate('category', 'name');

  return res.json({
    product
  });
};

const addProduct = async (req =  request, res = response) => {
  const {status, user, ...body} = req.body;

  const productDB = await ProductModel.findOne({name: body.name});

  if (productDB) {
    return res.status(400).json({
      message: `Product ${body.name} already exist`,
    });
  }

  // Generate data before save
  const productData= {
    ...body,
    user: req.authUser._id,
  }

  const product = new ProductModel(productData);

  // Save in DB
  await product.save();

  return res.status(201).json({
    message: 'Product created',
    product
  });
}

const updateProduct = async (req, res = response) => {
  const id = req.params.id;
  const {user, ...body} = req.body;

  // {new:true} is for show new data in te response
  const product = await ProductModel.findByIdAndUpdate(id, body, {new:true});

  return res.json({
    message: 'Product updated',
    product
  });
};


const deleteProduct = async (req, res = response) => {
  const id = req.params.id;

  // Logical remove
  // {new:true} is for show new data in te response
  const product = await ProductModel.findByIdAndUpdate(id, {status: false}, {new:true});

  res.json({
    message: 'category deleted',
    product,
  });
};

module.exports = {
  addProduct,
  getProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
}