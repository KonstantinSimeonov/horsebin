'use strict';

const fs = require('fs'),
    path = require('path');

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        GITHUB: {
            CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
            CLIENT_ID: process.env.GITHUB_CLIENT_ID
        }
    }
} else {
    const staticConfigFilePath = path.join(__dirname, './static-config.json');
    module.exports = JSON.parse(fs.readFileSync(staticConfigFilePath));
}

// staticConfig.GITHUB.CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// module.exports = Object.freeze(staticConfig);