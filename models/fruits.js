const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  origin: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

module.exports = mongoose.model('Fruit', fruitSchema);




// const fs = require('fs');
// const path = require('path');
// const Cart = require('./cart');
// const getDb = require('../util/database').getDb;
// const mongodb = require('mongodb');

// class Fruit {
//   constructor (name, imageUrl, description, origin, price, id, userId) {
//       this.name = name;
//       this.imageUrl = imageUrl;
//       this.description = description;
//       this.origin = origin;
//       this.price = price;
//       this._id = id ? new mongodb.ObjectId(id) : null;
//       this.userId = userId;
//   }

//   save() {
//     const db = getDb();
//     let dbOp;
//     if (this._id) {
//       // Update the product
//       dbOp = db
//         .collection('fruits')
//         .updateOne({ _id: this._id }, { $set: this });
//     } else {
//       dbOp = db.collection('fruits').insertOne(this);
//     }
//     return dbOp
//       .then(result => {
//         console.log(result);
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   }

//   static fetchAll() {
//     const db= getDb();
//     return db
//     .collection('fruits')
//     .find()
//     .toArray()
//     .then(fruits => {
//      // console.log(fruits);
//       return fruits;
//     })
//     .catch(err => {
//       console.log(err);
//     });
//   }

//   static findById(fruitId) {
//     const db = getDb();
//     return db
//     .collection('fruits')
//     .find({_id: mongodb.ObjectId(fruitId)})
//     .next()
//     .then(fruit => {
//       return fruit;
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   }

//     static deleteById(fruitId) {
//       const db = getDb();
//       return db
//       .collection('fruits')
//       .deleteOne({_id: new mongodb.ObjectId(fruitId)})
//       .then(result => {
//         console.log('Deleted Product');
//       })
//       .catch(err => console.log(err));
//     }
  
// }

// // const p = path.join(
// //   path.dirname(process.mainModule.filename),
// //   'data',
// //   'data.json'
// // );

// // const getFruitsFromFile = cb => {
// //   fs.readFile(p, (err, fileContent) => {
// //     if (err) {
// //       cb([]);
// //     } else {
// //     // console.log(JSON.parse(fileContent));
// //       cb(JSON.parse(fileContent));
// //     }
// //   });
// // };

// // module.exports = class Fruit {
// //   constructor(id, name, imageUrl, description, origin, price) {
// //     this.id = id;
// //     this.name = name;
// //     this.imageUrl = imageUrl;
// //     this.description = description;
// //     this.origin = origin;
// //     this.price = price;
// //   }

// //   save() {
// //     getFruitsFromFile(fruits => {
// //       if (this.id) {
// //         const existingProductIndex = fruits.findIndex(fruit => fruit.id === this.id);
// //         const updatedProducts = [...fruits];
// //         updatedProducts[existingProductIndex] = this;
// //         fs.writeFile(p, JSON.stringify(updatedProducts, null, 4), err => {
// //         });
// //       }else {
// //       this.id = Math.random().toString();
// //       fruits.push(this);
// //       fs.writeFile(p, JSON.stringify(fruits, null, 4), err => {
// //       });
// //     }
// //     });
// //   }

// //   static deleteById(id) {
// //     getFruitsFromFile(fruits => {
// //       const fruit = fruits.find(fruit => fruit.id === id);
// //       const updatedFruits = fruits.filter(fruit => fruit.id !== id);
// //       fs.writeFile(p, JSON.stringify(updatedFruits), err => {
// //         if (!err) {
// //           Cart.deleteProduct(id, fruit.price);
// //         }
// //       })
// //     });
// //   }

// //   static fetchAll(cb) {
// //     getFruitsFromFile(cb);
// //   }
  
// //   static findById(id, cb) {
// //       getFruitsFromFile(fruits => {
// //         const fruit = fruits.find(f => f.id === id);
// //      //   console.log(fruit);
// //         return cb(fruit);
// //       });
// //     }

// //     static updateFile(fruits) {
// //       fs.writeFile(p, JSON.stringify(fruits, null, 4), err => {
// //       });
// //     };
// // };

// module.exports = Fruit;