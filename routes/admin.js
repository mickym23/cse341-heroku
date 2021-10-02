const path = require('path');

const express = require('express');

const adminController = require('../controllers/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET
router.get('/del-product', adminController.getDelFruits);

// /admin/add-product => POST
router.post('/add-item', adminController.postAddProduct);

// /admin/del-product => POST
router.post('/del-item', adminController.postDeleteProduct);

module.exports = router;
