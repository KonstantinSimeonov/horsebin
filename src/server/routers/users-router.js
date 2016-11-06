'use strict';

const usersController = require('../controllers/users-controller'),
    authentication = require('../server-config/authentication');

module.exports = function (server) {
    server
        .get('/sign-up', usersController.getRegistrationForm)
        .post('/sign-up', usersController.register)
        .get('/sign-in', usersController.signIn)
        .post('/sign-in', authentication.login)
        .post('/sign-out', authentication.logout);
}