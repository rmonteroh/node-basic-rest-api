const {response, request} = require('express');


const getUser = (req = request, res = response) => {
  const params = req.query
  res.json({
    message: 'Get method controller',
    params
  });
};

const addUser = (req, res = response) => {
  const body = req.body;
  res.json({
    message: 'Put method controller',
    body
  });
};

const updateUser = (req, res = response) => {
  const id = req.params.id;
  res.json({
    message: 'Put method controller',
    id
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

