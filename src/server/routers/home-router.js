'use strict';

const homeController = require('../controllers/home-controller');

module.exports = function (server) {
    server
        .get('/home', homeController.index);
}