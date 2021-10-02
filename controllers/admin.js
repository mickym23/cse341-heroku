const { updateFile } = require('../models/fruits');
const Fruit = require('../models/fruits');

const navList = [{
   'linkName': 'Home',
   'href': '/'
},{
   'linkName': 'All Fruits',
   'href': '/display'
},{
   'linkName': 'Add Fruit',
   'href': '/add-product'
},{
   'linkName':'Delete Product',
   'href':'del-product'
}];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add Product | Node',
    navList: navList
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const origin = req.body.origin;
  const price = req.body.price;
  const fruit = new Fruit(name, imageUrl, description, origin, price);
  fruit.save();
  res.redirect('/');
};

exports.getDelFruits = (req, res, next) => {
  Fruit.fetchAll(fruits => {
    res.render('del-product', {
      fruits: fruits,
      pageTitle: 'Delete Fruits | Node',
      navList:navList
    });
  });
};

exports.postDeleteProduct = (req, res, next) => {
  const name = req.body.name; 
  Fruit.fetchAll(fruits => {
  for (let fruit of fruits) {
      if (fruit.name === name) {
        fruits.splice(fruits.indexOf(fruit), 1);
      }
  }
  updateFile(fruits);
});
  res.redirect('/');
}