const { Router } = require('express');
const { check } = require('express-validator');
const { addProduct, getAllProducts, getProduct, deleteProduct, updateProduct } = require('../controllers/product.controller');
const { existCategoryById, existProductById } = require('../helpers/db-validators');
const {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRoles,
} = require('../middlewares');

const router = Router();

router.get('/', getAllProducts);


router.post('/', [
  check('name', 'Name is required').not().isEmpty(),
  check('status', 'Status is required'),
  check('price', 'Price is required'),
  check('category', 'Not a valid id').isMongoId(),
  check('category').custom((id) => existCategoryById(id)),
  validateJWT,
  validateFields,
], addProduct);

router.get('/:id', [
  validateJWT,
  check('id', 'Not a valid id').isMongoId(),
  check('id').custom((id) => existProductById(id)),
  validateFields
], getProduct);

router.put('/:id', [
  validateJWT,
  check('category', 'Not a valid id').isMongoId(),
  check('id').custom((id) => existProductById(id)),
  validateFields
], updateProduct);


router.delete('/:id', [
  validateJWT,
  isAdminRole,
  hasRoles('ADMIN_ROLE', 'SUPER_ADMIN_ROLE'),
  check('id', 'Not a valid id').isMongoId(),
  check('id').custom((id) => existProductById(id)),
  validateFields,
], deleteProduct);

module.exports = router;

