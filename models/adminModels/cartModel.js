const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  user_id: { type: mongoose.Schema.Types.ObjectId, required: true },
  // Define other fields as needed
});


const Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;
