const { Router } = require('express');
const { check } = require('express-validator');
const { addCategory, getAllCategories, updateCategory, deleteCategory, getCategory } = require('../controllers/category.controller');
const { existUserById, existCategoryById } = require('../helpers/db-validators');
const {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRoles,
} = require('../middlewares');

const router = Router();

router.get('/', getAllCategories);


router.post('/', [
  check('name', 'Category name is required').not().isEmpty(),
  check('status', 'Category status is required'),
  validateJWT,
  validateFields,
], addCategory);

router.get('/:id', [
  validateJWT,
  check('id', 'Not a valid id').isMongoId(),
  check('id').custom((id) => existCategoryById(id)),
  validateFields
], getCategory);

router.put('/:id', [
  validateJWT,
  check('id', 'Not a valid id').isMongoId(),
  check('id').custom((id) => existCategoryById(id)),
  check('name', 'Category name is required').not().isEmpty(),
  validateFields
], updateCategory);


router.delete('/:id', [
  validateJWT,
  isAdminRole,
  hasRoles('ADMIN_ROLE', 'SUPER_ADMIN_ROLE'),
  check('id', 'Not a valid id').isMongoId(),
  check('id').custom((id) => existCategoryById(id)),
  validateFields,
], deleteCategory);

module.exports = router;

