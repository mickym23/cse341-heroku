const Fruit = require('../models/fruits');

exports.getFruits = (req, res, next) => {
   Fruit.fetchAll(fruits => {
     res.render('display', {
       fruits: fruits,
       pageTitle: 'Fruits | Node',
     });
   });
 };
 
 exports.getFruit = (req, res, next) => {
   const fruitId = req.params.fruitId;
   Fruit.findById(fruitId, fruit => {
     console.log(fruit);
     res.render('details', {
      pageTitle: 'Details | Node',
       detailedFruit: fruit
     });
   });
 };
 
 exports.getIndex = (req, res, next) => {
   Fruit.fetchAll(fruits => {
     res.render('home', {
       fruits: fruits,
       pageTitle: 'Home | Node',
     });
   });
 };
 
//  exports.getCart = (req, res, next) => {
//    res.render('shop/cart', {
//      path: '/cart',
//      pageTitle: 'Your Cart'
//    });
//  };
 
//  exports.postCart = (req, res, next) => {
//    const prodId = req.body.productId;
//    console.log(prodId);
//    res.redirect('/cart');
//  };
 
//  exports.getOrders = (req, res, next) => {
//    res.render('shop/orders', {
//      path: '/orders',
//      pageTitle: 'Your Orders'
//    });
//  };
 
//  exports.getCheckout = (req, res, next) => {
//    res.render('shop/checkout', {
//      path: '/checkout',
//      pageTitle: 'Checkout'
//    });
//  };
 