var express = require('express');
var router = express.Router();
var passport = require('passport');
var userModel = require('../models/user');

router.post('/signup', function (req, res, next) {
    var body = req.body;
    username = body.username;
    password = body.password;
    userModel.findOne({ username: username }, function (err, data) {
        if (err) { res.status(500).json('error occured') }
        else {
            if (data) {
                res.status(500).json('user already exists')
            } else {
                var record = new userModel();
                record.username = username
                record.password = record.hashPassword(password)
                record.save(function (err, user) {
                    if (err)
                        res.status(500).json('db error')
                    res.json(user)
                });
            }
        }
    })
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/profile',
}))

module.exports = router;