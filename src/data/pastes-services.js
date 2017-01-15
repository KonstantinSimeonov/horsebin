'use strict';

const mongo = require('mongodb');

// mostRecentNPastes
const CACHE = Object.create(null),
    mostRecentPastesFields = {
        name: true,
        dateCreated: true,
        lang: true,
        _id: true
    };

// shared
const visibilityPublicFilter = { visibility: 'public' },
    sortByDateDesc = { dateCreated: -1 };

const serviceFunctions = [

    function getById(db, id) {
        const o_id = mongo.ObjectID(id);
        return db.collection('pastes').findOne({ _id: o_id });
    },

    function createPaste(db, paste) {
        paste.dateCreated = new Date().getTime();

        return db.collection('pastes').insert(paste);
    },

    function mostRecentNPastes(db, n) {
        if (CACHE.mostRecent) {
            const secondsTillCacheExpires = CACHE.expirationTime - new Date().getTime() / 1000;

            if (secondsTillCacheExpires > 0) {
                return Promise.resolve(CACHE.mostRecent);
            }
        }

        return db.collection('pastes')
            .find(visibilityPublicFilter, mostRecentPastesFields)
            .sort(sortByDateDesc)
            .limit(n)
            .toArray()
            .then(data => {
                CACHE.mostRecent = data;
                CACHE.expirationTime = new Date().getTime() / 1000 + 30;
                return data;
            });
    },

    function pastesByUser(db, user_id) {
        // TODO: pagination
        return db.collection('pastes')
            .find({ user_id })
            .sort(sortByDateDesc)
            .toArray();
    },

    function paged(db, options) {

        const filterOptions = {
            visibility: 'public'
        };

        if (options.contains) {
            filterOptions.name = { $regex: `.*${options.contains}.*` };
        }

        if (options.author) {
            filterOptions.author = { $regex: `.*${options.author}.*` };
        }

        return db.collection('pastes')
            .find(filterOptions)
            .sort(sortByDateDesc)
            .skip(options.pageSize * options.pageNumber)
            .limit(options.pageSize)
            .toArray();
    },

    function editContent(db, _id, author, content) {
        return db.collection('pastes').findOneAndUpdate({ _id: mongo.ObjectID(_id), author }, { $set: { content } });
    },

    function count(db, options) {
        return db.collection('pastes').count(options || {});
    }
];

module.exports = serviceFunctions;