const fs = require('fs');
const path = require('path');

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
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Fruit {
  constructor(name, imageUrl, description, origin, price) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.description = description;
    this.origin = origin;
    this.price = price;
  }

  save() {
    this.id = Math.random().toString();
    getFruitsFromFile(fruits => {
      fruits.push(this);
      fs.writeFile(p, JSON.stringify(fruits, null, 4), err => {
      });
    });
  }

  static fetchAll(cb) {
    getFruitsFromFile(cb);
  }
  
  static findById(id, cb) {
      getFruitsFromFile(fruits => {
        const fruit = fruits.find(f => f.id === id);
        cb(fruit);
      });
    }

    static updateFile(fruits) {
      fs.writeFile(p, JSON.stringify(fruits, null, 4), err => {
      });
    };
};
