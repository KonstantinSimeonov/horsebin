'use strict';

const mongo = require('mongodb'),
    connection = require('./mongo-connection');

const CACHE = Object.create(null);

function getById(id) {
    const o_id = mongo.ObjectID(id);
    return connection.then(db => db.collection('pastes').findOne({ _id: o_id }));
}

function createPaste(paste) {
    paste.dateCreated = new Date().getTime();
    
    return connection.then(db => db.collection('pastes').insert(paste));
}

function mostRecentNPastes(n) {
    if(CACHE.mostRecent && (new Date().getTime() - CACHE.expirationTime > 0)) {
        return Promise.resolve(CACHE.mostRecent);
    }

    return connection.then(db => db.collection('pastes')
                                        .find({ visibility: 'public' })
                                        .sort({ dateCreated: -1 })
                                        .limit(n)
                                        .toArray()
                                        .then(function (data) {
                                            CACHE.mostRecent = data;
                                            CACHE.expirationTime = new Date().getTime() + 1000 * 30;
                                            return data;
                                        }));
}

function pastesByUser(user_id) {
    // TODO: pagination
    return connection.then(db => db.collection('pastes')
                                        .find({ user_id })
                                        .sort({ dateCreated: -1 })
                                        .toArray());
}

module.exports = {
    getById,
    createPaste,
    mostRecentNPastes,
    pastesByUser
}