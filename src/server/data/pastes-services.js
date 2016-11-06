'use strict';

const mongo = require('mongodb'),
    connection = mongo.MongoClient.connect('mongodb://localhost:27017/npaste-db');

function getById(id) {
    const o_id = mongo.ObjectID(id);
    return connection.then(db => db.collection('pastes').findOne({ _id: o_id }));
}

function createPaste(paste) {
    paste.dateCreated = new Date().getTime();
    
    return connection.then(db => db.collection('pastes').insert(paste));
}

function mostRecentNPastes(n) {
    return connection.then(db => db.collection('pastes')
                                        .find({ visibility: 'public' })
                                        .sort({ dateCreated: -1 })
                                        .limit(n)
                                        .toArray())
}

module.exports = {
    getById,
    createPaste,
    mostRecentNPastes
}