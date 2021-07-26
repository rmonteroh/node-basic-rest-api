const { response } = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');

const login = async (req, res = response) => {
  const {email, password} = req.body;

  try {

    // Verify email exist
    const user = await UserModel.findOne({email});
    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // Verify if user is active
    if (!user.status) {
      return res.status(400).json({
        message: 'User disabled'
      });
    }

    // Verify password
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // Generate jwt
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }

};

module.exports = {
  login
}