const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

const path = require('path');

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'img')));

const navList = [{
   'linkName': 'Home',
   'href': '/'
},{
   'linkName': 'Book Display',
   'href': '/display'
},{
   'linkName': 'Add Product',
   'href': '/add-product'
}];


const books = ['Book 1', 'Book 2', 'Book 3', 'Book 4'];

app.get('/add-product', (req, res, next) => {
   res.render('add-product', {
      pageTitle: 'Add-Product | Node',
      navList:navList
   });
});

app.post('/add-item', (req, res, next) => {
   console.log(req.body.title);
   books.push(req.body.title);
   res.redirect('/');
});

app.get('/display', (req, res, next) => {
   res.render('display',{
      pageTitle: 'Booklist | Node',
      books:books,
      navList:navList
      });
   });

app.get('/', (req, res, next) => {
   res.render('home',{
      pageTitle: 'Home | Node',
      navList:navList
   });
});

app.listen(PORT);