
const Product = require('../models/adminModels/productDetailsModel');
const product_category = require('../models/adminModels/productModels');
const Cart = require('../models/adminModels/cartModel');
const secret = "rajeshgupta@8726"
const jwt = require('jsonwebtoken');
const User = require('../models/loginModel');
const Order = require('../models/orderModel');

function generateOrderID() {
    const timestamp = Date.now(); // Get the current timestamp
    const randomNum = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
    const uniqueID = `RG${timestamp}${randomNum}`; // Combine the timestamp and random number
    
    return uniqueID;
  }

const load_home = async(req, res) => {
    try {
        const product = await Product.find();
        const categories = await product_category.find();
        
        res.render('home-03', { product: product, categories: categories});

        
    } catch (error) {
        res.status(500).json({message : 'Internal server error'});
    }
}

const load_dashboard = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();
        
        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
        // console.log(cart);
        res.render('index', { product: product, categories: categories, user_id: payload.userId, cart: cart });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const load_blog = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();
        
        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
        // console.log(cart);
        res.render('blog', { product: product, categories: categories, user_id: payload.userId, cart: cart });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const load_contact = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();
        
        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
        // console.log(cart);
        res.render('contact', { product: product, categories: categories, user_id: payload.userId, cart: cart });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const load_product = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();
        
        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
        // console.log(cart);
        res.render('product', { product: product, categories: categories, user_id: payload.userId, cart: cart });


    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const load_cart = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();

        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
       
        res.render('shoping-cart', { product: product, categories: categories, user_id: payload.userId, cart: cart });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const load_order = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();

        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
        const orderlist = await Order.find({userId : payload.userId});
        // console.log(cart);
        res.render('order', { product: product, categories: categories, user_id: payload.userId, cart: cart , orderlist : orderlist });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const load_about = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();
        
        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
        // console.log(cart);
        res.render('about', { product: product, categories: categories, user_id: payload.userId, cart: cart });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const load_profile = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();
        
        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const loggeInUser = await User.findById(payload.userId);
        const cart = await Cart.find({ user_id: payload.userId });


        // console.log(loggeInUser);
        res.render('profile', { product: product, categories: categories, user_id: payload.userId, cart: cart  , user : loggeInUser});
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}


const load_orderDetails = async (req, res) => {

    try {
        const orderID = req.query.orderID;
        const product = await Product.find();
        const categories = await product_category.find();
        
        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const loggeInUser = await User.findById(payload.userId);
        const cart = await Cart.find({ user_id: payload.userId });
        const orderDetail = await Order.findOne({orderID:orderID});
        // console.log(orderDetail);

        // console.log(loggeInUser);
        res.render('order_details', { product: product, categories: categories, user_id: payload.userId, cart: cart  , user : loggeInUser , orderDetail : orderDetail});
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const load_checkout = async (req, res) => {

    try {
        const cartarr = JSON.parse(req.query.cartArray);
// console.log(cartarr);
        const product = await Product.find();
        const categories = await product_category.find();

        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
        
        let price = 0;
        if (cart.length > 0 && product.length > 0) {
            for (let i = 0; i < cart.length; i++) {
                // Assuming cart[i].price is convertible to a number
                // console.log(cart[i].product_id);
                for(let j = 0; j<product.length; j++)
                {
                    // console.log(product[j]._id);
                    if(cart[i].product_id.toString() === product[j]._id.toString())
                    {
                        price += product[j].price;

                    }
                }
            }
        }
        // console.log(price);
        
        res.render('checkout', { product: product, categories: categories, user_id: payload.userId, cart: cart , total_price : price , cartarr : cartarr});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const load_confirm = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();

        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
        // console.log(typeof(cart));
        // console.log(cart);
        let price = 0;
        if (cart.length > 0 && product.length > 0) {
            for (let i = 0; i < cart.length; i++) {
                // Assuming cart[i].price is convertible to a number
                // console.log(cart[i].product_id);
                for(let j = 0; j<product.length; j++)
                {
                    // console.log(product[j]._id);
                    if(cart[i].product_id.toString() === product[j]._id.toString())
                    {
                        price += product[j].price;

                    }
                }
            }
        }
        // console.log(price);

        res.render('confirmation', { product: product, categories: categories, user_id: payload.userId, cart: cart , total_price : price});

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const probyid = await Product.findById(productId);
        const product = await Product.find();
        const categories = await product_category.find();
        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const cart = await Cart.find({ user_id: payload.userId });
        //    console.log(cart);
        res.render('product-detail', { product: product, categories: categories, probyid: probyid, user_id: payload.userId, cart: cart });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

const addProductToCart = async (req, res) => {
    try {
        // Extract product details from the request body
        const { product_id, user_id } = req.body;

        // Create a new document in MongoDB collection
        await Cart.create({
            product_id: product_id,
            user_id: user_id,
            // Add more fields as needed
        });

        res.status(200).json({ message: 'Product added in the cart successfully' });


    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });

    }
}

const deleteProductFromCart = async (req, res) => {
    try {
        id = req.params.id;
      // Find the product by ID and delete it
      const deletedProduct = await Cart.deleteMany({ product_id : id});
        // console.log(deletedProduct);
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Return a success message
      res.status(200).json({ message: 'Product deleted successfully' });
  
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
} 

const createOrder = async (req, res) => {
    try {  
        // console.log(req.body);
        const { countryId, paymentmode, state, fullAddress, pincode } = req.body;
        const orderID = generateOrderID();
        const orderItems = JSON.parse(req.query.orders);
        const token = req.cookies.usercookies; // Assuming the token is stored in a cookie named 'usercookies'
        //    extracting the cookie from the token
        const payload = jwt.decode(token);
        const userId = payload.userId;
        const newOrder = new Order({
            countryId,
            paymentmode,
            state,
            fullAddress,
            pincode,
            orderID,
            orderItems,
            userId
        });

        const order = await newOrder.save();
        const emptyCart = await Cart.deleteMany({user_id : payload.userId});
        // res.status(200).json({ message: 'Order saved successfully!' , order});
        return res.redirect('/confirm');

    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}



module.exports = {
    load_dashboard,
    load_blog,
    load_about,
    load_cart,
    load_contact,
    load_product,
    load_profile,
    load_checkout,
    load_confirm,
    load_order,
    load_home,
    load_orderDetails,
    getProductById,
    addProductToCart,
    deleteProductFromCart,
    createOrder,

}

