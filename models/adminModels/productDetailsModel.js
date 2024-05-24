const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: true
    },
    product_name: {
        type: String,
        // required: true
    },
    price: {
        type: Number,
        // required: true
    },
    qty: {
        type: Number,
        // required: true
    },
    details: {
        type: String,
        // required: true
    },
    image: {
        type: String, // You might want to use a different type for storing images, like Buffer or GridFS
        // required: true
    }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
