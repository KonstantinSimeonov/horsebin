'use strict';

const mongo = require('mongodb'),
    connection = mongo.MongoClient.connect('mongodb://localhost:27017/npaste-db');

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
                                        }));
}

module.exports = {
    getById,
    createPaste,
    mostRecentNPastes
}