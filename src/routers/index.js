'use strict';

const fs = require('fs'),
    path = require('path');

module.exports = function (server, dataServices) {
    fs.readdirSync(__dirname)
      .filter(fileName => fileName.endsWith('-router.js'))
      .forEach(function (routerName) {
          const router = require(path.join(__dirname, '/' + routerName));

          router(server, dataServices);
      });

    const errorsRouter = require(path.join(__dirname, './errors'));

    errorsRouter(server, dataServices);
}