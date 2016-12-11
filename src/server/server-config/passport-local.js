'use strict';

const LocalStrategy = require('passport-local'),
    users = require('../data/users-services'),
    encrypt = require('../utils/encrypt');

function authenticate(user, pswd) {
    return encrypt.hashPassword(user.salt, pswd) === user.passHash;
}

const localStrategy = new LocalStrategy((username, password, done) => {
    users
        .byUsername(username)
        .then(function (user) {
            if (user && authenticate(user, password)) {
                return done(null, user);
            }

            return done(null, false);
        })
        .catch(error => done(error, false));
});

module.exports = localStrategy;