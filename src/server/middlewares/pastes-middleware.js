'use strict';

const pastesServices = require('../data/pastes-services');

module.exports = {
    pasteById(req, res, next) {
        pastesServices
            .getById(req.params.pasteId)
            .then(paste => {
                req.paste = paste;
                next();
            });
    },
    mostRecentNPastes(n) {
        return function (req, res, next) {
            pastesServices.mostRecentNPastes(n).then(pastes => {
                req.mostRecent = pastes;
                next();
            });
        }
    }
};