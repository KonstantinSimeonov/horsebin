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
            passHash: encrypt.hashPassword(salt, user.password),
            roles: ['standard'],
            dateRegistered: new Date().getTime()
        };

        return connection.then(db => db.collection('users').insert(userToAdd));
    },
    updateUserSettings(_id, settings) {
        return connection.then(db => db.collection('users').update({ _id }, { $set: { settings } }));
    }
}