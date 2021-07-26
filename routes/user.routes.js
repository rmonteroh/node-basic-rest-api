
const { Router } = require('express');
const { check } = require('express-validator');
const { getUser, addUser, updateUser, deleteUser } = require('../controllers/user.controller');
const { isValidRole, emailExist, existUserById } = require('../helpers/db-validators');
const {
  validateFields,
  validateJWT,
  isAdminRole,
  hasRoles,
} = require('../middlewares');

const router = Router();

router.get('/', getUser);

router.post('/', [
  check('name', 'User name is required').not().isEmail(),
  check('password', 'User password must have more than 6 letters').isLength({min: 6}),
  check('email', 'Invalid Email').isEmail(),
  check('email').custom(emailExist),
  check('role').custom(isValidRole),
  validateFields,
], addUser);

router.put('/:id', [
  validateJWT,
  check('id', 'Not a valid id').isMongoId(),
  check('id').custom((id) => existUserById(id)),
  check('role').custom(isValidRole),
  validateFields
], updateUser);

router.delete('/:id', [
  validateJWT,
  isAdminRole,
  hasRoles('ADMIN_ROLE', 'SUPER_ADMIN_ROLE'),
  check('id', 'Not a valid id').isMongoId(),
  check('id').custom((id) => existUserById(id)),
  validateFields,
], deleteUser);

module.exports = router;