const express = require('express');
const router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local');

const Users = require('../bin/models/Users');

passport.use(new LocalStrategy({
    usernameField: 'name',
    passwordField: 'hashedPassword'
}, function(name, hashedPassword, cb) {
    Users.findOne({
        name
    }).exec((err, user) => {
        if (err) return cb(err);
        if (!user) return cb(null, false, { code: -1, message: 'Incorrect username or password.' });
        if (!user.hashedPassword === hashedPassword) {
            return cb(null, false, { code: -1, message: 'Incorrect username or password.' });
        }
        return cb(null, user);
    });
}));

passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, user._id);
    });
});

passport.deserializeUser(function (_id, cb) {
    process.nextTick(function () {
        return Users.findOne({ _id }, { hashed_password: 0, salt: 0 }, cb);
    });
});

router.post('/login', function (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err);
        if (!user) return res.json(info);
        req.logIn(user, null, (err2) => {
            if (err2) { return next(err2); }
            return res.json({
                code: 0,
                user,
                msg: '登陆成功'
            });
        });
    })(req, res, next);
});

router.get('/logout', (req, res, next) => {
    if(!req.user) res.json({
        // haven't login
        code: -1
    });
    else{
        req.logout((err) => {
            if(err) next(err)
            else{
                res.json({
                    code: 0
                });
            }
        });
    }
});

module.exports = router;