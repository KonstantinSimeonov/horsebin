'use strict';

const mongo = require('mongodb'),
    connection = require('./mongo-connection'),
    encrypt = require('../utils/encrypt');

module.exports = {
    byId(id) {
        const o_id = mongo.ObjectID(id);
        return connection.then(db => db.collection('users').findOne({ _id: o_id }));
    },
    byUsername(username) {
        return connection.then(db => db.collection('users').findOne({ username }));
    },
    createUser(user) {

        const salt = encrypt.generateSalt();

        const userToAdd = {
            username: user.username,
            salt: salt,
            passHash: encrypt.hashPassword(salt, user.pswd),
            roles: ['standard']
        };

        return connection.then(db => db.collection('users').insert(userToAdd));
    }
}