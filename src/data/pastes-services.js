'use strict';

/**
 * @typedef PaginationOptions
 * @type {object}
 * @property {string} author
 * @property {string} name
 * @property {string} lang
 * @property {number} pageSize
 * @property {number} pageNumber
 */

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

/**
 * Contains data service function that return promises.
 * @type {Array.<Function>}
 */
const serviceFunctions = [

    /**
     * @function getById
     * @param {Db} db Db object provided by mongo driver. Injected automatically.
     * @param {string} id Db id of the paste. 
     */
    function getById(db, id) {
        const o_id = mongo.ObjectID(id);
        return db.collection('pastes').findOne({ _id: o_id });
    },

    /**
     * @function createPaste
     * @param {Db} db Db object provided by mongo driver. Injected automatically.
     * @param {Object} paste Paste record to create.
     * @return {Promise.<Object>}
     */
    function createPaste(db, paste) {
        paste.dateCreated = new Date().getTime();

        return db.collection('pastes').insert(paste);
    },

    /**
     * @function mostRecentNPastes
     * @param {Db} db Db object provided by mongo driver. Injected automatically.
     * @param {number} n How many latest pastes to fetch from db.  
     * @return {Promise.<[{ _id: ObjectID, content: string, name: string, dateCreated: number }]>}
     */
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

    /**
     * @function pastesByUser
     * @param {Db} db Db object provided by mongo driver. Injected automatically.
     * @param {string} user_id The id of the user whose pastes will be fetched from the database.
     * @returns {Promise.<[Object]>}
     */
    function pastesByUser(db, user_id) {
        // TODO: pagination
        return db.collection('pastes')
            .find({ user_id })
            .sort(sortByDateDesc)
            .toArray();
    },

    /**
     * @function paged
     * @param {Db} db Db object provided by mongo driver. Injected automatically.
     * @param {PaginationOptions} options
     * @returns {Promise.<[Object]>}
     */
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

    /**
     * @function editContent
     * @param {Db} db Db object provided by mongo driver. Injected automatically.
     * @param {string} _id Database id of the paste's content that will be updated.
     * @param {string} author Name of the user who requests to edit the paste.
     * @param {string} content The new content that should replace the old content of the paste.
     * @returns {Promise.<Object>}
     */
    function editContent(db, _id, author, content) {
        return db.collection('pastes').findOneAndUpdate({ _id: mongo.ObjectID(_id), author }, { $set: { content } });
    },

    /**
     * @function editContent
     * @param {Db} db Db object provided by mongo driver. Injected automatically.
     * @param {object} options Options object to filter pastes by.
     * @returns {Promise.<Number>}
     */
    function count(db, options) {
        return db.collection('pastes').count(options || {});
    },

    /**
     * @function like
     * @param {Db} db Db object provided by mongo driver. Injected automatically.
     * @param {string} pasteId Database id of the paste to like.
     * @param {string} userId Database id of the user that likes the paste.
     * @returns {Promise.<[Object]>}
     */
    // function like(db, pasteId, userId) {
    //     const incrementLikes = db.collection('pastes')
    //         .findOneAndUpdate({ _id: mongo.ObjectID(pasteId) }, { $inc: { likesCount: 1 } }),
    //         addLikeToUser = db.collection('users')
    //             .findOneAndUpdate({ _id: mongo.ObjectID(userId) }, { $push: { likedPastesIds: pasteId } });

    //     return Promise.all([incrementLikes, addLikeToUser]);
    // },

    // function unlike(db, pasteId, userId) {
    //     const decrementLikes = db.collection('pastes')
    //         .findOneAndUpdate({ _id: mongo.ObjectID(pasteId) }, { $inc: { likesCount: -1 } }),
    //         removeLikeFromUser = db.collection('users')
    //             .findOneAndUpdate({ _id: mongo.ObjectID(userId) }, { $pull: { likedPastesIds: pasteId } });

    //     return Promise.all([decrementLikes, removeLikeFromUser]);
    // },

    function updateLike(db, pasteId, userId, isLike) {
        const increment = isLike ? 1 : -1,
            arrayAction = isLike ? '$push' : '$pull',
            updateLikesCount = db.collection('pastes')
                                    .findOneAndUpdate({ _id: mongo.ObjectID(pasteId) },
                                                      { $inc: { likesCount: increment } }),
            updateUserLikes = db.collection('users')
                                .findOneAndUpdate({ _id: mongo.ObjectID(userId) },
                                                  { [arrayAction]: { likedPastesIds: pasteId } });

        return Promise.all([ updateLikesCount, updateUserLikes ]);
    }
];

module.exports = serviceFunctions;