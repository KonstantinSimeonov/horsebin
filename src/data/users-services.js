'use strict';

const mongo = require('mongodb'),
    encrypt = require('../utils/encrypt');

const serviceFunctions = [

    function byId(db, id) {
        const o_id = mongo.ObjectID(id);
        return db.collection('users').findOne({ _id: o_id });
    },

    function byGithubId(db, githubId) {
        return db.collection('users').findOne({ github_id: githubId });
    },

    function byUsername(db, username) {
        return db.collection('users').findOne({ username });
    },

    function createUser(db, user) {

        const salt = encrypt.generateSalt(),
            userToAdd = {
                username: user.username,
                salt: salt,
                passHash: encrypt.hashPassword(salt, user.password || encrypt.genenerateRandomPassword()),
                roles: ['standard'],
                dateRegistered: new Date().getTime(),
                settings: {
                    theme: 'solarizedlight'
                }
            };

        if (user.githubId) {
            userToAdd.github_id = user.githubId;
        }

        return db.collection('users').insert(userToAdd);
    },

    function updateUserSettings(db, _id, settings) {
        return db.collection('users').update({ _id }, { $set: { settings } });
    }
];

module.exports = serviceFunctions;