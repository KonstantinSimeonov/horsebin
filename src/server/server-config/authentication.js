'use strict';

const passport = require('passport');

module.exports = {
    login(req, res, next) {

        const auth = passport.authenticate('local', function (error, user) {
            if (error) {
                return next(error);
            }

            if (!user) {
                return res.send({
                    success: false
                });
            }

            // use function attached to the request by passport
            req.logIn(user, function (error) {
                if (error) {
                    return next(error);
                }

                // res.send({
                //     success: true,
                //     user: user
                // });
                res.redirect('/home');
            });
        });

        auth(req, res, next);
    },
    logout(req, res, next) {
        req.logout();
        res.redirect('/sign-out');
        //res.end();
    },
    isAuthenticated(req, res, next) {
        if (!req.isAuthenticated()) {
            res.status(403).redirect('/unauthorized');
        } else {
            next();
        }
    },
    isInRole(role) {
        return function (req, res, next) {
            if (req.isAuthenticated() && req.user.roles.indexOf(role) !== -1) {
                next();
            } else {
                res.status(403).redirect('/unauthorized');
            }
        }
    }
}