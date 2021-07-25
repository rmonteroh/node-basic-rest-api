
const { Router } = require('express');
const { getUser, addUser, updateUser, deleteUser } = require('../controllers/user.controller');

const router = Router();

router.get('/', getUser);

router.post('/', addUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

module.exports = router;