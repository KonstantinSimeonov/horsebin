'use strict';

const usersController = require('../controllers/users-controller'),
    authentication = require('../server-config/authentication');

module.exports = function (server) {
    server
        .get('/profile', authentication.isAuthenticated, usersController.getProfile)
        .post('/profile/settings', authentication.isAuthenticated, usersController.updateSettings)
        .get('/sign-up', usersController.getRegistrationForm)
        .post('/sign-up', usersController.register)
        .get('/sign-in', usersController.signIn)
        .post('/sign-in', authentication.login)
        .post('/sign-out', authentication.isAuthenticated, authentication.logout);
}