'use strict';

const fs = require('fs'),
    path = require('path');

const staticConfigFilePath = path.join(__dirname, './static-config.json'),
    staticConfig = JSON.parse(fs.readFileSync(staticConfigFilePath));

staticConfig.GITHUB.CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

module.exports = Object.freeze(staticConfig);