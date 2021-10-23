const bcrypt = require('bcryptjs');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const sendgridKey = require('@sendgrid/mail');
const crypto = require('crypto');
const { validationResult } = require('express-validator/check')

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
         errorMessage: message,
         oldInput: {
            email: '',
            password: ''
         },
         validationErrors: []
        });
} 

exports.postLogin = (req, res, next) => {
   const email = req.body.email;
   const password = req.body.passwd;

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).render('login', {
         pageTitle: 'Login | Node',
         errorMessage: errors.array()[0].msg,
         oldInput: {
         email: email,
         password: password
          },
          validationErrors: errors.array()
      });
   }  

   User.findOne({
      email: email
   }).then(user => {
      if (!user) {
         console.log(errors.array())
         return res.status(422).render('login', {
            pageTitle: 'Login | Node',
            errorMessage:'Invalid email or password.',
            oldInput: {
            email: email,
            password: password
             },
            validationErrors: errors.array()
         });
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
               return res.status(422).render('login', {
                  pageTitle: 'Login | Node',
                  errorMessage:'Invalid email or password',
                  oldInput: {
                  email: email,
                  password: password
                   },
                  validationErrors:errors.array()
               });
            })
            .catch(err => {
               console.log(err);
               res.redirect('/login');
            })  
         })
      .catch(err => {
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
         });
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
      errorMessage: message,
      oldInput: {
         email: "",
         password: "",
         confirmPassword:""
      },
      validationErrors:[]
   });
}

exports.postSignUp = (req, res, next) => {
   const email = req.body.email;
   const passwd = req.body.passwd;
   const cPass = req.body.confirmPasswd;
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(422).render('signup', {
         pageTitle: 'SignUp | Node',
         errorMessage: errors.array()[0].msg,
         oldInput: {
            email: email,
            password: passwd,
            confirmPassword: cPass
         },
         validationErrors: errors.array()
      });
   }
   bcrypt
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
      .catch(err => {
         const error = new Error(err);
         error.httpStatusCode = 500;
         return next(error);
   });
}

exports.getReset = (req, res, next) => {
   let message = req.flash('error');
   if (message.length > 0) {
      message = message[0];
   } else {
      message = null;
   }
   res.render('reset', {
      pageTitle: 'Reset Password | Node',
      errorMessage: message
   });
}

exports.postReset = (req, res, next) => {
   crypto.randomBytes(32, (err, buffer) => {
      if (err) {
         console.log(err);
         return res.redirect('/reset');
      }

      const token = buffer.toString('hex');
      User.findOne({
         email: req.body.email
      })
         .then(user => {
            if (!user) {
               req.flash('error', 'No account with that email found.')
               return res.redirect('/reset');
            }
            user.resetToken = token;
            user.resetTokenExpiration = Date.now() + 3600000;
            return user.save();
         }).then(result => {
            res.redirect('/');
            const msg = {
               to: req.body.email,
               from: 'illuminationofdemacia@gmail.com',
               subject: 'Password Reset',
               html: `
                  <p>You have requested a password reset</p>
                  <p>Click this <a href="https://cse341-mikhail.herokuapp.com/reset/${token}">link</a> to set a new password:</p> 
               `
            };
            sendgridKey.send(msg).then(() => console.log('Email sent')).catch(err => {
               console.log(err);
            })


         }).catch(err => { 
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
      })
   })
}

exports.getNewPassword = (req, res, next) => {
   const token = req.params.token;
   User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() }
   }).then(user => {
      let message = req.flash('error');
      if (message.length > 0) {
         message = message[0];
      } else {
         message = null;
      }
      res.render('new-password', {
         pageTitle: 'New Password | Node',
         errorMessage: message,
         userId: user._id.toString(),
         passwordToken: token
      });
   })
      .catch(err => {
         console.log(err);
   })
}

exports.postNewPassword = (req, res, next) => {
   const newPassword = req.body.password;
   const userId = req.body.userId;
   const passwordToken = req.body.passwordToken;
   let resetUser;

   User.findOne({
      reset: passwordToken,
      resetTokenExpiration: { $gt: Date.now() },
      _id: userId
   }).then(user => {
      resetUser = user;
      return bcrypt.hash(newPassword, 12);
   }).then(hashedPassword => {
      resetUser.password = hashedPassword;
      resetUser.resetToken = undefined;
      resetUser.resetTokenExpiration = undefined;
      return resetUser.save();
   }).then(result => {
      res.redirect('/login');
   }).catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
   });
}