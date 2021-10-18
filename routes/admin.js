const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// // /admin/del-product => GET
router.get('/del-product', adminController.getDelFruits);

// // /admin/del-product => GET
router.get('/admin-products', adminController.getAdminFruits);

// // /admin/edit-product => GET
router.get('/edit-product/:fruitId', adminController.getEditProduct);

// /admin/add-product => POST
router.post('/add-item', adminController.postAddProduct);

// // /admin/del-product => POST
router.post('/del-item', adminController.postDeleteProduct);

router.post('/edit-item', adminController.postUpdatedProduct);

module.exports = router;
