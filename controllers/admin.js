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
  const fruit = new Fruit(name, imageUrl, description, origin, price, null, req.user._id);
  fruit
    .save()
    .then(result => {
      console.log('Created Fruit Item');
      res.redirect('/admin-products')
    })
    .catch(err => {
      console.log(err);
    })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;

  if(!editMode) {
    res.redirect('/');
  }
  const fruitId = req.params.fruitId;
  Fruit.findById(fruitId)
  .then(fruit => {
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

exports.postUpdatedProduct = (req, res, next) => {
  const fruitId = req.body.fruitId
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const origin = req.body.origin;
  const price  = req.body.price;

  const fruit = new Fruit(name, imageUrl, description, origin, price, fruitId)

  fruit
  .save()
  .then(result => {
    console.log('Product is Updated.');
    res.redirect('/admin-products');
  })
  .catch(err => console.log(err));
}

exports.getAdminFruits = (req, res, next) => {
  Fruit.fetchAll()
  .then(fruits => {
    res.render('display', {
      fruits: fruits,
      pageTitle: 'Fruits Admin | Node',
      admin: true
    });
  })
  .catch(err => console.log(err));
};


exports.getDelFruits = (req, res, next) => {
  Fruit.fetchAll(fruits => {
    res.render('del-product', {
      fruits: fruits,
      pageTitle: 'Delete Fruits | Node',
    });
  });
};


exports.postDeleteProduct = (req, res, next) => {
  const fruitId = req.body.fruitId;
  Fruit.deleteById(fruitId)
  .then(() => {
    console.log('Controller: Product Deleted.');
    res.redirect('/admin-products');
  })
  .catch(err => {
    console.log(err);
  })
}