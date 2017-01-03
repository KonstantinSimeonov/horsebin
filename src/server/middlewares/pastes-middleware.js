'use strict';

const pastesServices = require('../data/pastes-services');

module.exports = {
    pasteById(req, res, next) {
        pastesServices
            .getById(req.params.pasteId)
            .then(paste => {
                if(paste.pswd !== req.query.pswd) {
                    const options = { pasteId: req.params.pasteId };
                    
                    if(req.query.pswd) {
                        options.wrongPswd = true;
                    }

                    return res.render('unlock-paste', options);
                }

                req.paste = paste;
                next();
            })
            .catch(error => {
                // TODO: handle properly
                console.log(error);
                res.redirect(500, '/error');
            });
    },
    mostRecentNPastes(n) {
        return function (req, res, next) {
            pastesServices
                .mostRecentNPastes(n)
                .then(pastes => {
                    req.mostRecent = pastes;

                    next();
                })
                .catch(error => {
                    // TODO: handle properly
                    console.log(error);
                    res.redirect(500, '/error');
                });
        }
    }
};