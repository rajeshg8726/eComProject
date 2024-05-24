const Product = require('../models/adminModels/productDetailsModel');
const product_category = require('../models/adminModels/productModels');
const Cart = require('../models/adminModels/cartModel');
const secret = "rajeshgupta@8726"
const jwt = require('jsonwebtoken');
const User = require('../models/loginModel');
const Order = require('../models/orderModel');


const withoutLoginHomePage = async (req, res) => {
    try {
        const product = await Product.find();
        const categories = await product_category.find();
        
        res.render('home-03', { product: product, categories: categories});

        
    } catch (error) {
        res.status(500).json({message : 'Internal server error'});
    }
};



const getProductByIdWithoutLogin = async (req, res) => {
    try {
        const productId = req.params.id;
        const probyid = await Product.findById(productId);
        const product = await Product.find();
        const categories = await product_category.find();
        
        // console.log(probyid);
        res.render('withoutLoginProductView', { product: product, categories: categories, probyid: probyid});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const withoutLoginShowProducts = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();
        
       
        res.render('withoutLoginProduct', { product: product, categories: categories });


    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    withoutLoginHomePage,
    getProductByIdWithoutLogin,
    withoutLoginShowProducts,
}

