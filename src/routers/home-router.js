'use strict';

const homeController = require('../controllers/home-controller');

module.exports = function (server) {
    server
        .get('/', homeController.index)
        .get('/home', homeController.index);
}