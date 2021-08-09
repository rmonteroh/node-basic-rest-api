const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const userModel = require("../models/user.model");

const permittedCollections = [
  'user',
  'category',
  'product',
  'role',
];

const searchUser = async (search = '', res = response) => {
  const isMongoId = ObjectId.isValid(search);

  if (isMongoId) {
    const user = await userModel.findById(search);
    return res.json({
      results: [user]
    });
  }
};


const search = (req, res = response) => {
  const {collection, search} = req.params;

  if (!permittedCollections.includes(collection)) {
    return res.status(400).json({
      message: `The collection is not permitted`
    });
  }

  switch (collection) {
    case 'user':
      searchUser(search, res)
      break;
  
    default:
      return res.status(500).json({
        message: `Collection not exist`
      });
      break;
  }
};

module.exports = {
  search,
}