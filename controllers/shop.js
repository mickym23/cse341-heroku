const Fruit = require('../models/fruits');

const navList = [{
   'linkName': 'Home',
   'href': '/'
},{
   'linkName': 'Book Display',
   'href': '/display'
},{
   'linkName': 'Add Product',
   'href': '/add-product'
},{
   'linkName':'Delete Product',
   'href':'del-product'
}];


const books = [];

exports.getFruits = (req, res, next) => {
   Fruit.fetchAll(fruits => {
     res.render('display', {
       fruits: fruits,
       pageTitle: 'Fruits | Node',
       navList:navList
     });
   });
 };
 
 exports.getFruit = (req, res, next) => {
   const fruitId = req.params.fruitId;
   Fruit.findById(fruitId, fruit => {
     res.render('details', {
       fruit:fruit,
       pageTitle: 'Fruit',
       navList:navList
     });
   });
 }
 
 exports.getIndex = (req, res, next) => {
   Fruit.fetchAll(fruits => {
     res.render('home', {
       fruits: fruits,
       pageTitle: 'Home | Node',
       navList:navList
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
 