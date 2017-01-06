'use strict';

const passport = require('passport'),
    session = require('express-session'),
    localStrategy = require('./passport-local'),
    githubStrategy = require('./passport-github');

module.exports = function (server, dataServices) {

    const { users } = dataServices;

    // insert middleware
    server.use(session({ secret: 'secret horse' }));
    server.use(passport.initialize());
    server.use(passport.session());

    // use auth strategies
    require('./passport-github')(passport, dataServices);
    require('./passport-local')(passport, dataServices);

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