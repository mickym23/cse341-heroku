
const { updateFile } = require('../models/fruits');
const Fruit = require('../models/fruits');

exports.getAddProduct = (req, res, next) => {
  res.render('edit-product', {
    pageTitle: 'Add Product | Node',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const origin = req.body.origin;
  const price = req.body.price;
  const fruit = new Fruit(null, name, imageUrl, description, origin, price);
  fruit.save();
  res.redirect('/display');
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if(!editMode) {
    res.redirect('/');
  }
  const fruitId = req.params.fruitId;
  Fruit.findById(fruitId, fruit => {
    if (!fruit) {
      return res.redirect('/');
    }
  res.render('edit-product', {
    pageTitle: 'Edit Product | Node',
    editing: editMode,
    fruit: fruit
  });  
})
};

exports.getAdminFruits = (req, res, next) => {
  Fruit.fetchAll(fruits => {
    res.render('display', {
      fruits: fruits,
      pageTitle: 'Fruits Admin | Node',
      admin: true
    });
  });
};


exports.getDelFruits = (req, res, next) => {
  Fruit.fetchAll(fruits => {
    res.render('del-product', {
      fruits: fruits,
      pageTitle: 'Delete Fruits | Node',
    });
  });
};

exports.postUpdatedProduct = (req, res, next) => {
  const fruitId = req.body.fruitId
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const origin = req.body.origin;
  const price  = req.body.price;

  const updatedProduct = new Fruit(fruitId, name, imageUrl, description, origin, price);

  updatedProduct.save();
  res.redirect('/admin-products');
}

exports.postDeleteProduct = (req, res, next) => {
  const fruitId = req.body.fruitId;
  Fruit.deleteById(fruitId);
  res.redirect('/admin-products');
}