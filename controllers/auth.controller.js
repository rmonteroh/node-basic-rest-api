const { response } = require('express');
const bcrypt = require('bcryptjs');

const UserModel = require('../models/user.model');
const { generateJWT } = require('../helpers/generate-jwt');
const googleVerify = require('../helpers/google-verify');

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

const googleSignIn = async (req, res = response) => {
  const id_token = req.body.id_token;
  const googleUser = await  googleVerify(id_token);
  const {name, picture: image, email} = googleUser;

  try {
    let user = await UserModel.findOne({email});
    if (!user) {
      // Create user
      const userData = {
        name,
        email,
        password: ':P',
        image,
        google: true,
      };

      user = new UserModel(userData);
      user.save();
    }

    // Verify user status
    if (!user.status) {
      return res.status(401).json({
        message: 'User disabled',
      });
    }

    // Generate jwt
    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    res.status(400).json({
      message: 'Google token not valid',
      id_token
    });
  }


}

module.exports = {
  login,
  googleSignIn,
}