const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');
// const { runInContext } = require('vm');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/display', shopController.getFruits);

router.get('/fruits/:fruitId', shopController.getFruit);

// router.get('/cart', shopController.getCart);

// router.post('/cart', shopController.postCart);

// router.get('/orders', shopController.getOrders);

// router.get('/checkout', shopController.getCheckout);

module.exports = router;