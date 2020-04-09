var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
  name: String,
  owner: {
      type:String,
      ref:'user'
  }
}, {collection: 'car'});

var carModel = mongoose.model('car',carSchema)

module.exports = carModel;