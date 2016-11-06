'use strict';

const usersController = require('../controllers/users-controller');

module.exports = function (server) {
    server
        .get('/sign-up', usersController.getRegistrationForm)
        .post('/sign-up', usersController.register);
}