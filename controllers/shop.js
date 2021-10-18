const Fruit = require('../models/fruits');
const Cart = require('../models/cart');

exports.getFruits = (req, res, next) => {
   Fruit.fetchAll()
   .then(fruits => {
     res.render('display', {
       fruits: fruits,
       pageTitle: 'Fruits | Node',
       admin: false
     });
   })
   .catch(err => {
     console.log(err);
   });
 };
 
 exports.getFruit = (req, res, next) => {
   const fruitId = req.params.fruitId;
   Fruit.findById(fruitId)
    .then(fruit => {
     res.render('details', {
      pageTitle: 'Details | Node',
      detailedFruit: fruit
     })
   })
   .catch(err => {
     console.log(err);
   })
 };
 
 exports.getIndex = (req, res, next) => {
   Fruit.fetchAll()
   .then(fruits => {
     res.render('home', {
       fruits: fruits,
       pageTitle: 'Home | Node',
     });
   })
   .catch(err => {
     console.log(err);
   })
 };
 
 exports.getCart = (req, res, next) => {
   req.user
   .getCart()
   .then(fruits => {
      res.render('cart', {
        path: '/cart',
        pageTitle: 'Your Cart',
        fruits: fruits
      });
     })
     .catch(err => console.log(err));
   };
 
 
 exports.postCart = (req, res, next) => {
   const fruitId = req.body.fruitId;
   Fruit.findById(fruitId)
    .then(fruit => {
      req.user.addToCart(fruit);
      res.redirect('/cart');
    })
    .then(result => {
      console.log(result);
    });
 };

 exports.postCartDelete = (req, res, next) => {
  const fruitId = req.body.fruitId;
  Fruit.findById(fruitId, fruit => {
    Cart.deleteProduct(fruitId, fruit.price);
    res.redirect('/cart');
  });
 };
 
 exports.getOrders = (req, res, next) => {
   res.render('shop/orders', {
     path: '/orders',
     pageTitle: 'Your Orders'
   });
 };
 
//  exports.getCheckout = (req, res, next) => {
//    res.render('shop/checkout', {
//      path: '/checkout',
//      pageTitle: 'Checkout'
//    });
//  };
 