const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(payload, process.env.SECRET_JWT_KEY, {
      expiresIn: '4h'

    }, (error, token) => {

      if (error) {
        console.log(error);
        reject('Token not generated');
      } else {
        resolve(token);
      }

    });
  });
};

module.exports = {
  generateJWT
}