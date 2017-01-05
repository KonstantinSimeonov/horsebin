'use strict';

const dataServices = require('../data'),
    usersController = require('../controllers/users-controller')(dataServices),
    authMiddleware = require('../middlewares/authentication-middleware'),
    passport = require('passport');

module.exports = function (server) {
    server
        .get('/profile', authMiddleware.isAuthenticated, usersController.getProfile)
        .post('/profile/settings', authMiddleware.isAuthenticated, usersController.updateSettings)
        .get('/sign-up', usersController.getRegistrationForm)
        .post('/sign-up', usersController.register)
        .get('/sign-in', usersController.signIn)
        .get('/auth/github', passport.authenticate('github', { scope: 'user' }), (req, res) => {})
        .get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/gosho' }), (req, res) => res.redirect('/home'))
        .post('/sign-in', authMiddleware.login)
        .get('/sign-out', authMiddleware.isAuthenticated, authMiddleware.logout)
}