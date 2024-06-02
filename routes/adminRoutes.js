const express = require('express');
const adminController = require('../controllers/adminController');
const path = require('path');
const ejs = require('ejs');
const upload = require('../middleware/index');

const router = express.Router();


// Route to serve images
router.get('/admin/product_images/:id', adminController.getProductImages );
   
  
router.get('/admin/dashboard', adminController.load_admin_dashboard);
router.get('/admin',adminController.load_signUp)
router.get('/admin/signup',adminController.load_signIn);
router.post('/admin/login', adminController.verify_user);
router.post('/admin/register',adminController.registerAdmin);
router.get('/admin/product_cat', adminController.load_product_cat);
router.get('/admin/product_add', adminController.load_product_add);
router.post('/admin/addProductCategory' , adminController.addProductCategory);
router.get('/admin/getAllCategories', adminController.getAllCategories);
router.post('/admin/save_product' , upload.single('image'), adminController.save_product);
router.get('/admin/product_list' , adminController.product_list);
router.get('/admin/edit_product/:id' , adminController.load_product_edit);
router.delete('/admin/delete_product/:id' , adminController.deleteProduct);
router.put('/admin/save_edit_product/:id', upload.single('image'), adminController.save_edit_product);
router.get('/demo' , adminController.load_demo_view);  
router.get('/admin/orderList', adminController.load_orderList);


module.exports = router;
