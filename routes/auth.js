const express = require('express');
const { check, body } = require('express-validator/check');
const User = require('../models/user');

const router = express.Router();

const authController = require('../controllers/auth');

router.get('/login', authController.getLogin);

router.post('/login',
   body('email')
      .isEmail()
      .withMessage('Please enter a valid email.'),
   body('passwd', 'Please enter a password with at least 5 characters.')
      .isLength({ min: 5 })
      .trim(),
   authController.postLogin);

router.post('/logout', authController.postLogout);

router.get('/sign-up', authController.getSignUp);

router.post('/sign-up',
   check('email')
      .isEmail()
      .withMessage('Please enter a valid email.')
      .custom((value, { req }) => {
         return User.findOne({ email: value })
            .then(userDoc => {
               if (userDoc) {
                  return Promise.reject('Email exists already.');
               }
            })
      }),
   body('passwd', 'Please enter a password with at least 5 characters.')
      .isLength({ min: 5 })
      .trim(),
   body('confirmPasswd')
      .custom((value, { req }) => {
         if (value !== req.body.passwd) {
            throw new Error('Passwords have to match!');
         }
         return true;
      })
      .trim(),
   authController.postSignUp);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;
