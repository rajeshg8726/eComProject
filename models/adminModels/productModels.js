const mongoose = require('mongoose');

const productCategory = mongoose.Schema({

    name:{
        type:String,
        required:true,
        unique:true,
    },

});


const product_category = mongoose.model('productCategory', productCategory);

module.exports = product_category;