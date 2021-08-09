const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
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
  },
  price: {type: Number, default: 0},
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  description: {type: String},
  inStock: {type: Boolean, default: true}
});


// Need to be a function in order to use this inside
ProductSchema.methods.toJSON = function() {
  const {__v, ...data} = this.toObject();

  return data;
}

module.exports = model('Product', ProductSchema);