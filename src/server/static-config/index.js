'use strict';

const fs = require('fs'),
    path = require('path');

const staticConfigFilePath = path.join(__dirname, './static-config.json'),
    staticConfig = JSON.parse(fs.readFileSync(staticConfigFilePath));

module.exports = Object.freeze(staticConfig);