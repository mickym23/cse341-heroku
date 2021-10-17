const Fruit = require('../models/fruits');
const Cart = require('../models/cart');

exports.getFruits = (req, res, next) => {
   Fruit.fetchAll(fruits => {
     res.render('display', {
       fruits: fruits,
       pageTitle: 'Fruits | Node',
       admin: false
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
 
 exports.getCart = (req, res, next) => {
   Cart.getFruits(cart => {
     Fruit.fetchAll(fruits => {
       const cartProducts = [];
      for (let fruit of fruits) {
        const cartProductData = cart.products.find(fru => fru.id === fruit.id);
        if(cartProductData) {
          cartProducts.push({
            fruitData: fruit, 
            qty: cartProductData.qty
          });
        }
      }
    res.render('cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      fruits: cartProducts
    });
   });
   });
 };
 
 exports.postCart = (req, res, next) => {
   const fruitId = req.body.fruitId;
   Fruit.findById(fruitId, (fruit) => {
    Cart.addProduct(fruitId, fruit.price)
   });
   res.redirect('/cart');
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
 