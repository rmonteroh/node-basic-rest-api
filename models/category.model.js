const {Schema, model} = require('mongoose');

const CategorySchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: [true, 'The name is required'],
  },
  status: {
    type: Boolean,
    default: true,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
    required: true,
  }
});


// Need to be a function in order to use this inside
CategorySchema.methods.toJSON = function() {
  const {__v, ...data} = this.toObject();

  return data;
}

module.exports = model('Category', CategorySchema);