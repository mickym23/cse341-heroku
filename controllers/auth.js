const User = require('../models/user');

exports.getLogin = (req, res, next) => {
        res.render('login', {
           pageTitle: 'Login | Node',
           isAuthenticated: false
        });
}

exports.postLogin = (req, res, next) => {
   User.findById('616e1954aee925b44b6ce3ee')
      .then(user => {
      req.session.isLoggedIn = true;
         req.session.user = user;
         req.session.save((err => {
            res.redirect('/');
         }))
   })
   .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
   req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
   });
}