const Fruit = require('../models/fruits');
const { validationResult } = require('express-validator/check')

exports.getAddProduct = (req, res, next) => {
  res.render('edit-product', {
    pageTitle: 'Add Product | Node',
    editing: false,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  });
};

exports.postAddProduct = (req, res, next) => {
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const origin = req.body.origin;
  const price = req.body.price;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('edit-product', {
      pageTitle: 'Add Product | Node',
      editing: false,
      hasError: true,
      fruit: {
        name: name,
        imageUrl: imageUrl,
        description: description,
        origin: origin,
        price: price
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
  
    }); 
  }

  const fruit = new Fruit({
    name: name,
    imageUrl: imageUrl, 
    description: description,
    origin: origin, 
    price: price,
    userId: req.user
  });
  fruit
    .save()
    .then(result => {
      console.log('Created Fruit Item');
      res.redirect('/admin-products')
    })
    .catch(err => {

      // res.redirect('/500');
      // if (!errors.isEmpty()) {
      //   return res.status(500).render('edit-product', {
      //     pageTitle: 'Add Product | Node',
      //     editing: false,
      //     hasError: true,
      //     fruit: {
      //       name: name,
      //       imageUrl: imageUrl,
      //       description: description,
      //       origin: origin,
      //       price: price
      //     },
      //     errorMessage: 'Database operation failed. Please try again.',
      //     validationErrors: []
      
      //   }); 
      // }
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
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
    fruit: fruit,
    hasError: false,
    errorMessage: null,
    validationErrors: []
  }); 
})
};

exports.postUpdatedProduct = (req, res, next) => {
  const fruitId = req.body.fruitId
  const name = req.body.name;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const origin = req.body.origin;
  const price = req.body.price;
  
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).render('edit-product', {
      pageTitle: 'Edit Product | Node',
      editing: true,
      hasError: true,
      fruit: {
        name: name,
        imageUrl: imageUrl,
        description: description,
        origin: origin,
        price: price,
        _id: fruitId
      },
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
  
    }); 
  }

  Fruit.findById(fruitId)
    .then(fruit => {
      if (fruit.userId.toString() !== req.user._id.toString()) {
      return res.redirect('/');
    }
    fruit.name = name;
    fruit.imageUrl = imageUrl;
    fruit.description = description;
    fruit.origin = origin;
    fruit.price = price;
    fruit.userId = req.user._id
   // fruit.userId = req.user;
    return fruit.save().then(result => {
      console.log('Product is Updated.');
      res.redirect('/admin-products');
    })
  })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
  });
}

exports.getAdminFruits = (req, res, next) => {
  Fruit.find({
    userId: req.user._id
  })
  // .select('name price -_id')
  // .populate('userId', 'name')
  .then(fruits => {
    res.render('display', {
      fruits: fruits,
      pageTitle: 'Fruits Admin | Node',
      admin: true,

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
  Fruit.deleteOne({
    _id: fruitId,
    userid: req.user._id
  })
  .then(() => {
    console.log('Controller: Product Deleted.');
    res.redirect('/admin-products');
  })
  .catch(err => {
    const error = new Error(err);
    error.httpStatusCode = 500;
    return next(error);
  })
}