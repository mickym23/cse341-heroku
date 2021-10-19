// Required NPM Packages
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors') // Place this with other requires (like 'path' and 'express')

// Required Models
const User = require('./models/user');

// MongoDB Connection string and Config Var
const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://mikhail-node:Porkchops1@cluster0.mszib.mongodb.net/shop?authSource=admin&replicaSet=atlas-vg9xcm-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true";

// Create Express server
const app = express();

// Using EJS template
app.set('view engine', 'ejs');

// BodyParser and static paths to folders 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'img/fruit')));

const corsOptions = {
   origin: "https://cse341-mikhail.herokuapp.com/",
   optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// User Middleware (finding hard-coded user)
app.use((req, res, next) => {
   User.findById('616e1954aee925b44b6ce3ee')
   .then(user => {
      req.user = user;
      next();
   })
   .catch(err => console.log(err));
});

const options = {
   useUnifiedTopology: true,
   useNewUrlParser: true,
   autoIndex: false
};

// PORT for Heroku or Localhost
const PORT = process.env.PORT || 3000;

// Shop Routes
const shopRoutes = require('./routes/shop');
app.use(shopRoutes);

// Admin Routes
const adminRoutes = require('./routes/admin');
app.use(adminRoutes);

// Error 404
const errorController = require('./controllers/error');
app.use(errorController.get404);

// Connect to db via Mongoose
mongoose.connect(
   MONGODB_URL, options
)
.then(result => {
   User.findOne().then(user => {
      if (!user) {
         // Create a user if user is not found
         const user = new User({
            name: 'Mikhail',
            email: 'test@gmail.com',
            cart: {
               items: []
            }
         });
         user.save(); 
      }
   })
   // Connected to Port
   console.log('Connected!')
   app.listen(PORT);
})
.catch(err => {
   console.log(err);
})