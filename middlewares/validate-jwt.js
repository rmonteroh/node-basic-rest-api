const {request, response} = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const validateJWT = async (req = request, res = response, next) => {
  const token  = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      message: 'Acction not permited'
    });
  };

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const { uid } = payload;
    const authUser = await userModel.findById(uid); 

    if (!authUser) {
      return res.status(401).json({
        message: 'Uer not exist'
      });
    };

    if (!authUser.status) {
      return res.status(401).json({
        message: 'User disabled'
      });
    };

    req.authUser = authUser;
    next();

  } catch (error) {
    console.log(error);
    res.status(401).json({
      message: 'Invalid token'
    });
  }
}

module.exports = {
  validateJWT
}