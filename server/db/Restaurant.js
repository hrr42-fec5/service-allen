const mongoose = require('mongoose');
const db = require('./index.js');

const restaurantSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  name: String,
  imageUrls: [],
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;