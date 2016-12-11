'use strict';

const mongo = require('mongodb'),
    connection = require('./mongo-connection'),
    encrypt = require('../utils/encrypt');

module.exports = {
    byId(id) {
        const o_id = mongo.ObjectID(id);
        return connection.then(db => db.collection('users').findOne({ _id: o_id }));
    },
    byGithubId(githubId) {
        return connection.then(db => db.collection('users').findOne({ github_id: githubId }));
    },
    byUsername(username) {
        return connection.then(db => db.collection('users').findOne({ username }));
    },
    createUser(user) {

        const salt = encrypt.generateSalt();
        console.log(`DB >>>>>>> ${JSON.stringify(user)}`);
        const userToAdd = {
            username: user.username,
            salt: salt,
            passHash: encrypt.hashPassword(salt, user.password || encrypt.genenerateRandomPassword()),
            roles: ['standard'],
            dateRegistered: new Date().getTime()
        };

        if(user.githubId) {
            console.log('SDRAFEI KON');
            userToAdd.github_id = user.githubId;
        }

        return connection.then(db => db.collection('users').insert(userToAdd));
    },
    updateUserSettings(_id, settings) {
        return connection.then(db => db.collection('users').update({ _id }, { $set: { settings } }));
    }
}