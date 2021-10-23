const path = require('path');

const express = require('express');
const { body } = require('express-validator/check')

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product',
   isAuth, adminController.getAddProduct);

// // // /admin/del-product => GET
// router.get('/del-product', adminController.getDelFruits);

// // /admin/del-product => GET
router.get('/admin-products', isAuth, adminController.getAdminFruits);

// // /admin/edit-product => GET
router.get('/edit-product/:fruitId',
      
   isAuth, adminController.getEditProduct);

// /admin/add-product => POST
router.post('/add-item',
      body('name').isString()
      .isLength({ min: 3 })
      .trim(),
      body('imageUrl')
      .isURL(),
      body('price')
      .isFloat(),
      body('description')
      .isLength({ min: 3, max: 400 })
      .trim(),
      body('origin')
         .isString()
         .isLength({ min: 3 })
      .trim(),
   isAuth, adminController.postAddProduct);

// // // /admin/del-product => POST
router.post('/del-item',  isAuth,  adminController.postDeleteProduct);

router.post('/edit-item', 
      body('name').isString()
      .isLength({ min: 3 })
      .trim(),
      body('imageUrl')
      .isURL(),
      body('price')
      .isFloat(),
      body('description')
      .isLength({ min: 3, max: 400 })
      .trim(),
      body('origin')
         .isString()
         .isLength({ min: 3 })
      .trim(),
   isAuth, adminController.postUpdatedProduct);

module.exports = router;
