'use strict';

const cryptoJS = require('crypto');

module.exports = {
    generateSalt() {
        return cryptoJS.randomBytes(128).toString('base64');
    },
    genenerateRandomPassword() {
        return cryptoJS.randomBytes(10).toString('base64');
    },
    hashPassword(salt, password) {
        const hmac = cryptoJS.createHmac('sha1', salt);
        return hmac.update(password).digest('hex');
    }
};