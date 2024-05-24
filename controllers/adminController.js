
const admin_register = require('../models/adminModels/loginModels');
const product_category = require('../models/adminModels/productModels');
const Product = require('../models/adminModels/productDetailsModel');
const Order = require('../models/orderModel');

const load_admin_dashboard = async (req, res) => {
    try {
        res.render('adminview/dashboard');
    } catch (error) {
        console.log(error.message);
    }
}

const load_signIn = async (req, res) => {
    try {
        res.render('adminview/sign-in');
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const load_signUp = async (req, res) => {
    try {
        res.render('adminview/sign-up');
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const load_orderList = async (req, res) => {
    try {
        const allOrders = await Order.find();

        res.render('adminview/order_list' , {orders : allOrders});
        
    } catch (error) {
        console.log(error.message);
        
    }
}

const load_product_cat = async (req ,res) => {
    try {
        
        res.render('adminview/product_category');

    } catch (error) {
        console.log(error.message);
        
    }
}

const load_product_add = async (req, res) => {
    try {
        const categories = await product_category.find();
        res.render('adminview/product_add', { categories: categories});  }
         catch (error) {
        console.log(error.message);
    }
}

const load_product_edit = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        // console.log(product);
        const categories = await product_category.find();
        res.render('adminview/product_edit', { categories: categories , product: product });  }
         catch (error) {
        console.log(error.message);
    }
}

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        
        // Create a new admin user
        const newAdmin = new admin_register({ name, email, password });
        await newAdmin.save();
        
        // Assuming you want to redirect to a dashboard route after successful registration
        // res.status(200).json({message: 'user registerd succes'});
        res.render('adminview/dashboard');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
}

const verify_user = async (req, res) => {

    try {
        
        const {email , password} = req.body;

        const existUser = await admin_register.findOne({email});
    
        if(!existUser){
            res.status(200).json({message: 'User not exits'});
        }
    
        if(existUser.password !== password){
            res.status(200).json({message: 'Enter Valid Password'});
        }
    
        res.render('adminview/dashboard');


    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

const addProductCategory = async (req, res) => {

    try {
        const {name} = req.body;

        const existCat = await product_category.findOne({name});
        if(existCat){
            res.status(200).json({message: 'Category already exits'});
        }

        const newCat = new product_category({name});
        newCat.save();

        // Render the page with a success message
        res.render('adminview/product_category', { successMessage: 'Category saved successfully' });

    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
        
    }
}

const getAllCategories = async (req, res) => {
    try {
        const categories = await product_category.find();
        res.render('adminview/product_add', { categories: categories });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
const save_product = async (req, res) => {
    try {
        const { category, product_name, price, details , qty } = req.body;
                // Check if file was uploaded
                if (!req.file) {
                    throw new Error('No file uploaded');
                }
        
        const image = req.file.filename; // Assuming you're using multer for file uploads

        const newProduct = new Product({
            category,
            product_name,
            price,
            qty,
            details,
            image
        });

         newProduct.save();
        // Redirect to another route within the same controller
        res.redirect('/product_add?msg=Product save successfully');

        // res.render('adminview/product_add', { successMessage: 'Product saved successfully' });
    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: 'Internal server error' });
    }
};

const save_edit_product = async (req, res) => {
        
        try {
           
          // Find the product by ID
          const single_product = await Product.findById(req.params.id);
            // console.log(single_product);
          // Update the product with the form data
          single_product.category = req.body.category;
          single_product.product_name = req.body.product_name;
          single_product.price = req.body.price;
          single_product.qty = req.body.qty;
          single_product.details = req.body.details;
      
          // If image is uploaded, update the image path
          if (!req.file) {
            throw new Error('No file uploaded');
        }

        single_product.image = req.file.filename;
      
          // Save the updated product
          await single_product.save();
      
      
          const product = await Product.find();
          const categories = await product_category.find();
  
        // Redirect to another route within the same controller
       
    //    res.status(200).json({ message: 'Edited Product Done!'  , product : single_product});
        res. redirect(200 , '/product_list');


    } catch (error) {
        console.error(error); // Log the error to the console
        res.status(500).json({ message: 'Internal server error' });
    }
}

const product_list = async (req, res) => {

    try {
        const product = await Product.find();
        const categories = await product_category.find();

        res.render('adminview/product_list' , { product : product , categories:categories });
    } catch (error) {
    
        res.status(500).json({message: 'Internal server error'});
    }

}

const getProductImages = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
      if (!product || !product.image) {
        return res.status(404).send('Image not found');
      }
      // Assuming product.image is a Buffer containing the image data
      res.set('Content-Type', 'image/png'); // Set the correct content type
      res.send(product.image);
        
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});
    }
}

const deleteProduct = async (req, res) => {
    try {
      // Find the product by ID and delete it
      const deletedProduct = await Product.findByIdAndDelete(req.params.id);
  
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

const load_demo_view = async (req, res) => {
    try {
        
        res.render('adminview/demo');

    } catch (error) {
        
        
        res.status(500).json({ message: 'Internal server error' });

    }

}

module.exports = {
    load_admin_dashboard,
    load_product_cat,
    load_product_add,
    load_demo_view,
    load_orderList,
    addProductCategory,
    load_product_edit,
    save_edit_product,
    deleteProduct,
    getProductImages,
    product_list,
    save_product,
    getAllCategories,
    verify_user,
    load_signIn,
    load_signUp,
    registerAdmin,
}

