const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors') // Place this with other requires (like 'path' and 'express')
//const mongoConnect = require('./util/database').mongoConnect;

// const corsOptions = {
//     origin: "https://cse341-mikhail.herokuapp.com/",
//     optionsSuccessStatus: 200
// };
// app.use(cors(corsOptions));

// const options = {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: false,
//     family: 4
// };

// const MONGODB_URL = process.env.MONGODB_URL || "mongodb+srv://mikhail:Porkchops1@cse341cluster-3dwlw.mongodb.net/test?retryWrites=true&w=majority";
                        
const PORT = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'img/fruit')));

const User = require('./models/user');
app.use((req, res, next) => {
   User.findById('616e1954aee925b44b6ce3ee')
   .then(user => {
      req.user = user;
      next();
   })
   .catch(err => console.log(err));
});

const shopRoutes = require('./routes/shop');
app.use(shopRoutes);

const adminRoutes = require('./routes/admin');
app.use(adminRoutes);

const errorController = require('./controllers/error');
app.use(errorController.get404);

// mongoConnect(() => {
//    // if () {

//    // }
//    app.listen(PORT);
// });

mongoose.connect('mongodb+srv://mikhail-node:Porkchops1@cluster0.mszib.mongodb.net/shop?authSource=admin&replicaSet=atlas-vg9xcm-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true')
.then(result => {

   User.findOne().then(user => {
      if(!user) {
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
   
   console.log('Connected!')
   app.listen(3000);
  
})
.catch(err => {
   console.log(err);
})