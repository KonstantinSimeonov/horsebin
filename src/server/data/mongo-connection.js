'use strict';

const mongo = require('mongodb'),
    connectionString = process.env.CONNECTION_STRING || 'mongodb://localhost:27017/npaste-db',
    connection = mongo.MongoClient.connect(connectionString);

module.exports = connection;