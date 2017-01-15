'use strict';

const fs = require('fs');

const middlewares = {};

module.exports = dataServices => {
    fs.readdirSync(__dirname)
        .filter(fileName => fileName.endsWith('-middleware.js'))
        .forEach(fileName => {
            const middlewareName = fileName.split('-').shift() + 'Middleware';

            middlewares[middlewareName] = require('./' + fileName)(dataServices);
        });

    return middlewares;
}