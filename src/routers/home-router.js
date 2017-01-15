'use strict';

module.exports = function (server, middlewares, controllers) {
    const { homeController } = controllers;

    server
        .get('/', homeController.index)
        .get('/home', homeController.index);
}