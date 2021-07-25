const {Schema, model} = require('mongoose');

const UserSchema = Schema({
  name: {
    type: String,
    required: [true, 'The user name is required'],
  },
  email: {
    type: String,
    required: [true, 'The user email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'The user password is required'],
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ['ADMIN_ROLE', 'USER_ROLE']
  },
  status: {
    type: Boolean,
    default: true,
  },
  google: {
    type: Boolean,
    default: false,
  },
});

// Exclude version and password of user object for response to front app
// Need to be a function in order to use this inside
UserSchema.methods.toJSON = function() {
  const {__v, password, ...user} = this.toObject();
  return user;
}

module.exports = model('Users', UserSchema);

