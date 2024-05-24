const express = require('express');
const adminController = require('../controllers/adminController');
const path = require('path');
const ejs = require('ejs');
const upload = require('../middleware/index');

const router = express.Router();


// Route to serve images
router.get('/product_images/:id', adminController.getProductImages );
   
  
router.get('/dashboard', adminController.load_admin_dashboard);
router.get('/',adminController.load_signUp)
router.get('/signup',adminController.load_signIn);
router.post('/login', adminController.verify_user);
router.post('/register',adminController.registerAdmin);
router.get('/product_cat', adminController.load_product_cat);
router.get('/product_add', adminController.load_product_add);
router.post('/addProductCategory' , adminController.addProductCategory);
router.get('/getAllCategories', adminController.getAllCategories);
router.post('/save_product' , upload.single('image'), adminController.save_product);
router.get('/product_list' , adminController.product_list);
router.get('/edit_product/:id' , adminController.load_product_edit);
router.delete('/delete_product/:id' , adminController.deleteProduct);
router.put('/save_edit_product/:id', upload.single('image'), adminController.save_edit_product);
router.get('/demo' , adminController.load_demo_view);  
router.get('/orderList', adminController.load_orderList);


module.exports = router;
