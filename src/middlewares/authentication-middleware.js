'use strict';

const passport = require('passport');

module.exports = {
    loginLocal(req, res, next) {
        const auth = passport.authenticate('local', (error, user) => {
            if (error) {
                return next(error);
            }

            if (!user) {
                return res.status(400).json({ success: false, msg: 'Invalid username or password!' });
            }

            req.logIn(user, error => {
                if (error) {
                    return next(error);
                }

                return res.status(200).json({ success: true, msg: `Welcome, ${user.username}` });
            });
        });

        auth(req, res, next);
    },
    loginGithub(req, res, next) {
        passport.authenticate('github', { scope: 'user' })(req, res, next);
    },
    loginGithubCallback(req, res, next) {
        passport.authenticate('github', { failureRedirect: '/home' })(req, res, next);
    },
    logout(req, res) {
        req.logout();
        res.status(200).redirect('/home');
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