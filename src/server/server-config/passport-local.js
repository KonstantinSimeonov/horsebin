'use strict';

const LocalStrategy = require('passport-local'),
    encrypt = require('../utils/encrypt');

function authenticate(user, pswd) {
    return encrypt.hashPassword(user.salt, pswd) === user.passHash;
}

module.exports = (passport, dataServices) => {

    const { users } = dataServices;

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

    passport.use(localStrategy);
};