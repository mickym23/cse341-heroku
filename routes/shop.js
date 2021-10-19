const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/display', shopController.getFruits);

router.get('/display/:fruitId', shopController.getFruit);

router.get('/cart', shopController.getCart);

router.post('/cart', shopController.postCart);

router.post('/cart-del-item', shopController.postCartDelete);

router.get('/orders', shopController.getOrders);

router.post('/post-order', shopController.postOrder);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;
