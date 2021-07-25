const {response, request} = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user.model');


const getUser = (req = request, res = response) => {
  const params = req.query
  res.json({
    message: 'Get method controller',
    params
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

const deleteUser = (req, res = response) => {
  const id = req.params.id;
  res.json({
    message: 'Delete method controller',
    id
  });
};


module.exports = {
  getUser,
  addUser,
  updateUser,
  deleteUser,
};

