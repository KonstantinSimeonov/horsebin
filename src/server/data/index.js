'use strict';

const fs = require('fs');

const dataServices = {};

fs.readdirSync(__dirname)
    .filter(fileName => fileName.endsWith('-services.js'))
    .forEach(fileName => {
        const serviceName = fileName.replace('-services.js', '');

        dataServices[serviceName] = require(`./${fileName}`);
    });
    
module.exports = dataServices;