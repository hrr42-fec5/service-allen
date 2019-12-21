const mongoose = require('mongoose');
const Restaurants = require('./restaurant.js');
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const db = mongoose.connection;

mongoose.connect('mongodb://127.0.0.1/zagat', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));


const get = (id) => {
  return new Promise((resolve, reject) => {
    Restaurants.find({ id })
      .exec((err, docs) => {
        if (err) {
          reject(err);
        }
        resolve(docs);
      });
  });
};

const insert = (data) => {
  const entry = new Restaurants(data);
  return entry.save();
};

const updateData = (id, data) => {
    return new Promise((resolve, reject) => {
      Restaurants.update({id}, data)
        .exec((err, data) => {
          if (err) {
            reject(err);
          }
          resolve(data);
        });
    });
  };

const del = (id) => {
  return Restaurants.find({id})
  .remove()
  .exec();
}

module.exports = { db, get, insert, updateData, del };

//'mongodb://mongo:27017/zagat' ||
