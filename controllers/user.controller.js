const {response, request} = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user.model');


const getUser = async (req = request, res = response) => {
  const {limit = 5, from = 0} = req.query;
  const query = {status: true};

  // This is for execute both promises at the same time and reduce response time
  // If one of them fails all will fail
  const [total, users] = await Promise.all([
    UserModel.countDocuments(query),
    UserModel.find(query).skip(Number(from)).limit(Number(limit))
  ]);

  res.json({
    total,
    users
  });
};

const addUser = async (req, res = response) => {

  const {name, password, email, role} = req.body;
  const user = new UserModel({name,password,email,role});

  // Make password hash
  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  // Save in db
  await user.save();

  res.json({
    message: 'User created',
    user
  });
};

const updateUser = async (req, res = response) => {
  const id = req.params.id;
  const {_id, password, google, email, ...otherProps} = req.body;

  if (password) {
    // Make password hash
    const salt = bcrypt.genSaltSync();
    otherProps.password = bcrypt.hashSync(password, salt);
  }

  const user = await UserModel.findByIdAndUpdate(id, otherProps);

  res.json({
    message: 'User updated',
    user
  });
};

const deleteUser = async (req, res = response) => {
  const id = req.params.id;

  // Logical remove
  const user = await UserModel.findByIdAndUpdate(id, {status: false});

  res.json({
    message: 'User deleted',
    user,
  });
};


module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
};

