var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String
}, {collection: 'user'});

var userModel = mongoose.model('user',userSchema)

module.exports = userModel;