const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  categoryId: {
    type: Schema.Types.ObjectId,
    ref: 'category',
    required: true,
  },
  price: {
    type: Double,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  reviews: [{
    type: Schema.Types.ObjectId,
    ref: 'review',
    required: true
  }]
}, {
  timestamps: true
});

let Products = mongoose.model('product', productSchema)
module.exports = Products
