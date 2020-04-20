var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
  username: String,
  password: String
}, { collection: 'user' });

userSchema.methods.hashPassword = function (password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
}

userSchema.methods.comparePassword = function (password, hash) {
  return bcrypt.compareSync(password, hash)
}

var userModel = mongoose.model('user', userSchema)

module.exports = userModel;