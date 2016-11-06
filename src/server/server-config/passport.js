'use strict';

const passport = require('passport'),
    LocalPassport = require('passport-local'),
    session = require('express-session'),
    users = require('../data/users-services'),
    encrypt = require('../utils/encrypt');

function authenticate(user, pswd) {
    return encrypt.hashPassword(user.salt, pswd) === user.passHash;
}

module.exports = function (server) {
        
    // insert middleware
    server.use(session({ secret: 'huc huc' }));
    server.use(passport.initialize());
    server.use(passport.session());

    // set local auth strategy
    passport.use(new LocalPassport({
        passReqToCallback: true
    }, function (req, username, password, done) {
        users
            .byUsername(username)
            .then(function (dbUser) {
                if (dbUser && authenticate(dbUser, password)) {
                    return done(null, dbUser);
                }
                
                return done(null, false);
            }, function (error) {
                console.log(error);
                done(error, false);
            });
    }));

    passport.serializeUser(function (user, done) {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser(function (id, done) {
        users
            .byId(id)
            .then(function (dbUser) {
                if (dbUser) {
                    return done(null, dbUser);
                } else {
                    return done(null, false);
                }
            }, function (error) {
                console.log(error);
                done(error, false);
            });
    });
}