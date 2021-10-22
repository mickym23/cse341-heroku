// Required NPM Packages
const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors') // Place this with other requires (like 'path' and 'express')
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

// Required Models
const User = require('./models/user');
dotenv.config();

const MONGODB_URI = 'mongodb+srv://mikhail-node:Porkchops1@cluster0.mszib.mongodb.net/shop?authSource=admin&replicaSet=atlas-vg9xcm-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true';
// MongoDB Connection string and Config Var
const MONGODB_URL = process.env.MONGODB_URL || MONGODB_URI;
  
// Create Express server
const app = express();
const store = new MongoDBStore({
   uri: MONGODB_URI,
   collection: 'sessions'
});

const csrfProtection = csrf();
app.use(flash());


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
app.use(session({
   secret: 'my secret',
   resave: false,
   saveUninitialized: false,
   store: store
}));

app.use(csrfProtection);

app.use((req, res, next) => {
   User.findById(req.session.user)
      .then(user => {
         req.user = user;
         next();
      })
      .catch(err => console.log(err));
});

app.use((req, res, next) => {
   res.locals.isAuthenticated = req.session.isLoggedIn;
   res.locals.csrfToken = req.csrfToken();
   next();
})

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

const authRoutes = require('./routes/auth');
app.use(authRoutes);

// Error 404
const errorController = require('./controllers/error');
app.use(errorController.get404);

// Connect to db via Mongoose
mongoose.connect(
   MONGODB_URI, options
)
.then(result => {
   // Connected to Port
   console.log('Connected!')
   app.listen(PORT);
})
.catch(err => {
   console.log(err);
})