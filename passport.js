var LocalStrategy = require('passport-local').Strategy;
var userModel = require('./models/user')
var passport = require('passport');

passport.serializeUser(function (user, done) {
    done(null, user._id)
})

passport.deserializeUser(function (userId, done) {
    userModel.findById(userId,function(err,user){
        done(err,user)
    })
})

passport.use(new LocalStrategy(function (username, password, done) {
    userModel.findOne({ username: username }, function (err, data) {
        if (err)
            done(err)
        else {
            if (data) {
                var valid = data.comparePassword(password, data.password)
                if (valid)
                    done(null,data)
                else
                    done(null, false)
            }
            else
                done(null, false)
        }
    })
}))

module.exports = passport;