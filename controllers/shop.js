const Fruit = require('../models/fruits');
const Order = require('../models/order');

exports.getFruits = (req, res, next) => {
   Fruit.find()
   .then(fruits => {
     console.log(fruits);
     res.render('display', {
       fruits: fruits,
       pageTitle: 'Fruits | Node',
       admin: false,
       isAuthenticated: req.session.isLoggedIn
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
       detailedFruit: fruit,
       isAuthenticated: req.session.isLoggedIn

     })
   })
   .catch(err => {
     console.log(err);
   })
 };
 
 exports.getIndex = (req, res, next) => {
   Fruit.find()
   .then(fruits => {
     res.render('home', {
       fruits: fruits,
       pageTitle: 'Home | Node',
       isAuthenticated: req.session.isLoggedIn

     });
   })
   .catch(err => {
     console.log(err);
   })
 };
 
 exports.getCart = (req, res, next) => {
   req.user
   .populate('cart.items.fruitId')
     .then(user => {
      const fruits = user.cart.items;
      res.render('cart', {
        path: '/cart',
        pageTitle: 'Cart | Node',
        fruits: fruits,
        isAuthenticated: req.session.isLoggedIn
      });
     })
     .catch(err => console.log(err));
   };
 
 
 exports.postCart = (req, res, next) => {
   const fruitId = req.body.fruitId;
   Fruit.findById(fruitId)
    .then(fruit => {
      return req.user.addToCart(fruit); 
    })
    .then(result => {
      res.redirect('/cart');
    });
 };

 exports.postCartDelete = (req, res, next) => {
  const fruitId = req.body.fruitId;
  req.user
    .removeFromCart(fruitId)
    .then(result => {
      res.redirect('/cart');
    }) 
    .catch(err => console.log(err));
 };

exports.getOrders = (req, res, next) => {
  Order.find({
    "user.userId": req.user._id
  })
    .then(orders => {
      res.render('order', {
        pageTitle: 'Order | Node',
        orders: orders,
        isAuthenticated: req.session.isLoggedIn

      });
    })
    .catch(err => console.log(err));
};

exports.postOrder = (req, res, next) => {
  req.user
    .populate('cart.items.fruitId')
    //.execPopulate()
    .then(user => {
      const fruits = user.cart.items.map(i => {
        return {
          quantity: i.quantity,
          fruit: { ...i.fruitId._doc }
        }
      });

      const order = new Order({
        user: {
          name: req.user.name,
          userId: req.user
        },
        fruits: fruits
      });
      order.save();
    })
    .then(result => {
      return req.user.clearCart();
  })
    .then(result => {
      res.redirect('/orders');
    })
    .catch(err => console.log(err));
};

//  exports.getCheckout = (req, res, next) => {
//    res.render('shop/checkout', {
//      path: '/checkout',
//      pageTitle: 'Checkout'
//    });
//  };
 