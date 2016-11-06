'use strict';

const mongo = require('mongodb'),
    connection = mongo.MongoClient.connect('mongodb://localhost:27017/npaste-db');

module.exports = connection;