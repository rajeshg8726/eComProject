const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
  orderID: { type: String, required: true, unique: true },
  orderItems: { type: Array, required: true },
  countryId: {type : Number , required : true},
  paymentmode : {type : String , required : true},
  state : {type : String , required : true},
  fullAddress : {type : String , required : true},
  pincode: {type : Number , required : true},
  userId :{ type: mongoose.Schema.Types.ObjectId, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
