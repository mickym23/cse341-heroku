const express = require('express');
const PORT = process.env.PORT || 3000;

const path = require('path');

const app = express();
app.set('view engine', 'ejs');

const books = ['Book 1','Book 2', 'Book 3', 'Book 4'];

app.get('/users', (req, res, next) => {
   res.render('add-product')
});

app.get('/', (req, res, next) => {
   res.render('home');
});

app.listen(PORT);