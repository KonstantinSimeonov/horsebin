'use strict';

const passport = require('passport'),
    session = require('express-session'),
    users = require('../data/users-services'),
    localStrategy = require('./passport-local'),
    githubStrategy = require('./passport-github');

module.exports = function (server) {

    // insert middleware
    server.use(session({ secret: 'secret horse' }));
    server.use(passport.initialize());
    server.use(passport.session());

    // use auth strategies
    passport.use(localStrategy);
    passport.use(githubStrategy);

    passport.serializeUser((user, done) => {
        if (user) {
            return done(null, user._id);
        }
    });

    passport.deserializeUser((id, done) => {
        users
            .byId(id)
            .then(user => done(null, user || false))
            .catch(error => done(error, false));
    });
}