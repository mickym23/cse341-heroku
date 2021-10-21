const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const isAuth = require('../middleware/is-auth');

const router = express.Router();



// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// // // /admin/del-product => GET
// router.get('/del-product', adminController.getDelFruits);

// // /admin/del-product => GET
router.get('/admin-products', isAuth, adminController.getAdminFruits);

// // /admin/edit-product => GET
router.get('/edit-product/:fruitId', isAuth,  adminController.getEditProduct);

// /admin/add-product => POST
router.post('/add-item',  isAuth, adminController.postAddProduct);

// // // /admin/del-product => POST
router.post('/del-item',  isAuth,  adminController.postDeleteProduct);

router.post('/edit-item',  isAuth, adminController.postUpdatedProduct);

module.exports = router;
