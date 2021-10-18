const getDb = require('../util/database').getDb;
const mongodb = require('mongodb');

const ObjectId = mongodb.ObjectId;
class User {
   constructor (username, email, cart, id) {
      this.username = username;
      this.email = email;
      this.cart = cart;
      this._id = id;
   }

   save() {
      const db = getDb();
      return db
      .collection('users')
      .insertOne(this)
   }

   addToCart(fruit) {
      const cartFruitIndex = this.cart.items.findIndex(cf => {
         return cf.fruitId.toString() === fruit._id.toString();
      });

      let newQuantity = 1;
      const updatedCartItems = [...this.cart.items];

      if (cartFruitIndex >= 0) {
         newQuantity = this.cart.items[cartFruitIndex].quantity + 1;
         updatedCartItems[cartFruitIndex].quantity = newQuantity;
      } else {
         updatedCartItems.push({fruitId: new ObjectId(fruit._id), quantity: newQuantity});
      }

      const updatedCart = {
         items: updatedCartItems
      };

      const db = getDb();
      return db
      .collection('users')
      .updateOne(
        { _id: new ObjectId(this._id) },
        { $set: { cart: updatedCart } }
      );
   }

   getCart() {
      const db =getDb();
      const fruitIds = this.cart.items.map(i => {
         return i.fruitId;
      });

      return db
      .collection('fruits')
      .find({_id: {
         $in: fruitIds
      }}).toArray()
      .then(fruits => {
         return fruits.map(f => {
            return {...f, quantity: this.cart.items.find(i => {
               return i.fruitId.toString() === f._id.toString();
            }).quantity
         };
         });
      });
   }

   static findById(userId) {
      const db =getDb();
      return db
      .collection('users')
      .findOne({_id: new ObjectId(userId)})
      .then(user => { 
        // console.log(user)
         return user;
      }).catch(err => {
         console.log(err);
      });
   }
}

module.exports = User;