'use strict';

const usersController = require('../controllers/users-controller'),
    authentication = require('../server-config/authentication'),
    passport = require('passport');

module.exports = function (server) {
    server
        .get('/profile', authentication.isAuthenticated, usersController.getProfile)
        .post('/profile/settings', authentication.isAuthenticated, usersController.updateSettings)
        .get('/sign-up', usersController.getRegistrationForm)
        .post('/sign-up', usersController.register)
        .get('/sign-in', usersController.signIn)
        .get('/auth/github', passport.authenticate('github', { scope: 'user' }), (req, res) => {})
        .get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/gosho' }), (req, res) => res.redirect('/home'))
        .post('/sign-in', authentication.login)
        .post('/sign-out', authentication.isAuthenticated, authentication.logout, (req, res) => res.redirect('/home'))
}