const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

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