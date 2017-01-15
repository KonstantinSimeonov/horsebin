'use strict';

const mongo = require('mongodb');

const serviceFunctions = [

    function byId(db, id) {
        return db.collection('reports').find({ _id: mongo.ObjectID(id) });
    },

    function createReport(db, report) {
        const { content, pasteId, author } = report;

        return db.collection('reports').insert({ 
            content,
            pasteId,
            author,
            dateCreated: new Date().getTime()
        });
    },

    function paged(db, options) {
        return db.collection('reports')
            .find(options.filter || {})
            .sort({ dateCreated: -1 })
            .skip(options.pageSize * options.pageNumber)
            .limit(options.pageSize)
            .toArray();
    }
];

module.exports = serviceFunctions;