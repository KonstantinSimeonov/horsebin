'use strict';

const passport = require('passport');

module.exports = {
    login(req, res, next) {

        const auth = passport.authenticate('local', (error, user) => {
            if (error) {
                return next(error);
            }

            if (!user) {
                return res.send({ success: false });
            }

            req.logIn(user, error => {
                if (error) {
                    return next(error);
                }

                res.redirect('/home');
            });
        });

        auth(req, res, next);
    },
    logout(req, res, next) {
        req.logout();
        res.redirect('/home');
    },
    isAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            return res.status(403).redirect('/unauthorized');
        }

        next();
    },
    isInRole(role) {
        return (req, res, next) => {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) !== -1) {
                return next();
            }

            res.status(403).redirect('/unauthorized');
        }
    }
}