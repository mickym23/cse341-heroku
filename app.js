const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors') // Place this with other requires (like 'path' and 'express')

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

const shopRoutes = require('./routes/shop');
app.use(shopRoutes);

const adminRoutes = require('./routes/admin');
app.use(adminRoutes);

const errorController = require('./controllers/error');
app.use(errorController.get404);

app.listen(PORT);