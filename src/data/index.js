'use strict';

const fs = require('fs'),
    path = require('path');

const dataServices = {},
    mongoConnection = require('./mongo-connection');

fs.readdirSync(__dirname)
    .filter(fileName => fileName.endsWith('-services.js'))
    .forEach(fileName => {
        const serviceName = fileName.replace('-services.js', ''),
            service = {},
            serviceFunctions = require('./' + fileName);

        for(const serviceFn of serviceFunctions) {
            service[serviceFn.name] = function (...args) {
                return mongoConnection.then(db => serviceFn.apply(null, [db, ...args]));
            }
        }

        dataServices[serviceName] = service;
    });
    
module.exports = dataServices;