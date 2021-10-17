const fs = require('fs');
const path = require('path');
const Cart = require('./cart');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'data.json'
);

const getFruitsFromFile = cb => {
  fs.readFile(p, (err, fileContent) => {
    if (err) {
      cb([]);
    } else {
    // console.log(JSON.parse(fileContent));
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Fruit {
  constructor(id, name, imageUrl, description, origin, price) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.origin = origin;
    this.price = price;
  }

  save() {
    getFruitsFromFile(fruits => {
      if (this.id) {
        const existingProductIndex = fruits.findIndex(fruit => fruit.id === this.id);
        const updatedProducts = [...fruits];
        updatedProducts[existingProductIndex] = this;
        fs.writeFile(p, JSON.stringify(updatedProducts, null, 4), err => {
        });
      }else {
      this.id = Math.random().toString();
      fruits.push(this);
      fs.writeFile(p, JSON.stringify(fruits, null, 4), err => {
      });
    }
    });
  }

  static deleteById(id) {
    getFruitsFromFile(fruits => {
      const fruit = fruits.find(fruit => fruit.id === id);
      const updatedFruits = fruits.filter(fruit => fruit.id !== id);
      fs.writeFile(p, JSON.stringify(updatedFruits), err => {
        if (!err) {
          Cart.deleteProduct(id, fruit.price);
        }
      })
    });
  }

  static fetchAll(cb) {
    getFruitsFromFile(cb);
  }
  
  static findById(id, cb) {
      getFruitsFromFile(fruits => {
        const fruit = fruits.find(f => f.id === id);
     //   console.log(fruit);
        return cb(fruit);
      });
    }

    static updateFile(fruits) {
      fs.writeFile(p, JSON.stringify(fruits, null, 4), err => {
      });
    };
};
