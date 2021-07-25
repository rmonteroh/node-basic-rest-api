const RoleModel = require("../models/role.model");
const UserModel = require("../models/user.model");


const isValidRole = async (role = '') => {
  const existRole = await RoleModel.findOne({role});
  if (!existRole) {
    throw new Error(`The ${role} is not a valid role`);
  }
}

const emailExist = async (email = '') => {
   // Verify if email exist
   const existEmail = await UserModel.findOne({email});
   if (existEmail) {
      throw new Error(`Email ${email} is already taken`);
   }
}

const existUserById = async (id) => {
   const existUserId = await UserModel.findById(id);
   if (!existUserId) {
      throw new Error(`The id ${id} not exist`);
   }
}

module.exports = {
  isValidRole,
  emailExist,
  existUserById
}
