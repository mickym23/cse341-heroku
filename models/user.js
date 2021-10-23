const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
   email: {
      type: String,
      required: true
   },
   password: {
      type: String,
      required: true
   },
   resetToken: String,
   resetTokenExpiration: Date,
   cart: {
      items: [{
         fruitId: { 
            type: Schema.Types.ObjectId,
            ref: 'Fruit',
            required: true
         }, 
         quantity: {
            type: Number, 
            required: true
         }}],
   }
});

userSchema.methods.addToCart = function(fruit) {
   const cartFruitIndex = this.cart.items.findIndex(cf => {
      return cf.fruitId.toString() === fruit._id.toString();
   });

   let newQuantity = 1;
   const updatedCartItems = [...this.cart.items];

   if (cartFruitIndex >= 0) {
      newQuantity = this.cart.items[cartFruitIndex].quantity + 1;
      updatedCartItems[cartFruitIndex].quantity = newQuantity;
   } else {
      updatedCartItems.push({
         fruitId: fruit._id,
         quantity: newQuantity
      });
   }

   const updatedCart = {
      items: updatedCartItems
   };

   this.cart = updatedCart;
   return this.save();     
}

userSchema.methods.removeFromCart = function (fruitId) {
   const updatedCartItems = this.cart.items.filter(item => {
      return item.fruitId.toString() !== fruitId.toString();
   });
   this.cart.items = updatedCartItems;
   return this.save();
}

userSchema.methods.clearCart = function () {
   this.cart = {
      items: []
   };
   return this.save();
}

module.exports = mongoose.model('User', userSchema);

//    getOrders() {
//       const db= getDb();
//       return db
//       .collection('orders')
//       .find({'user._id': new ObjectId(this._id)})
//       .toArray();
//    }

//    static findById(userId) {
//       const db =getDb();
//       return db
//       .collection('users')
//       .findOne({_id: new ObjectId(userId)})
//       .then(user => { 
//         // console.log(user)
//          return user;
//       }).catch(err => {
//          console.log(err);
//       });
//    }
// }

// module.exports = User;