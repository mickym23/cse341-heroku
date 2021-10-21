const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sendgridKey = require('@sendgrid/mail');

sendgridKey.setApiKey(process.env.SENDGRID_API_KEY);

exports.getLogin = (req, res, next) => {
   let message = req.flash('error');
   if (message.length > 0) {
      message = message[0];
   } else {
      message = null;
   }
      res.render('login', {
           pageTitle: 'Login | Node',
           errorMessage: message
        });
} 

exports.postLogin = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.passwd;
   User.findOne({
      email: email
   })
      .then(user => {
         if (!user) {
            req.flash('error', 'Invalid email or password.');
            return res.redirect('/login');
         }

         bcrypt.compare(password, user.password)
            .then(doMatch => {
               if (doMatch) {
                  req.session.isLoggedIn = true;
                  req.session.user = user;
                  return req.session.save((err => {
                     console.log(err);
                     res.redirect('/');
                  }));
               }
               req.flash('error', 'Invalid email or password.');
               res.redirect('/login');
            })
            .catch(err => {
               console.log(err);
               res.redirect('/login');
            })  
         })
         .catch(err => console.log(err));
}

exports.postLogout = (req, res, next) => {
   req.session.destroy(err => {
      console.log(err);
      res.redirect('/');
   });
}

exports.getSignUp = (req, res, next) => {
   let message = req.flash('error');
   if (message.length > 0) {
      message = message[0];
   } else {
      message = null;
   }
   res.render('signup', {
      pageTitle: 'SignUp | Node',
      errorMessage: message
   });
}

exports.postSignUp = (req, res, next) => {
   const email = req.body.email;
   const passwd = req.body.passwd;
   const cPass = req.body.confirmPassword;

   User.findOne({
      email: email
   })
      .then(userDoc => {
         if (userDoc) {
            req.flash('error', 'Email exists already.');
            return res.redirect('/sign-up');
         }
         return bcrypt
            .hash(passwd, 12)
            .then(hashPassword => {
               const user = new User({
                  email: email,
                  password: hashPassword,
                  cart: {
                     items: []
                  }
               });
               return user.save();
            })
            .then(result => {
               const msg = {
                  to: email,
                  from: 'illuminationofdemacia@gmail.com',
                  subject: 'Signup succeeded!',
                  html: '<h1>You\'ve successfully signed up!</h1>'
               };
               res.redirect('/login');
               sendgridKey.send(msg).then(() => console.log('Email sent')).catch(err => {
                  console.log(err);
               })
            })
      })
      .catch(err => console.log(err));
}