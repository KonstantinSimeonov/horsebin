'use strict';

const fs = require('fs'),
    path = require('path');

module.exports = function (server) {
    fs.readdirSync(__dirname)
      .filter(fileName => fileName.indexOf('-router.js') !== -1)
      .forEach(function (routerName) {
          const router = require(path.join(__dirname, '/' + routerName));

          router(server);
      });

    const errorsRouter = require(path.join(__dirname, './errors'));

    errorsRouter(server);
}