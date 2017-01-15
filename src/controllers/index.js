'use strict';

const fs = require('fs'),
    path = require('path');

const controllers = {};
module.exports = dataServices => {
    fs.readdirSync(__dirname)
        .filter(fileName => fileName.endsWith('-controller.js'))
        .forEach(fileName => {
            const controllerName = fileName.split('-').shift() + 'Controller',
                controllerPath = path.join(__dirname, '/' + fileName);

            controllers[controllerName] = require(controllerPath)(dataServices);
        });

    return controllers;
};