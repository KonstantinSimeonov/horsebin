'use strict';

const pastesServices = require('../data/pastes-services'),
    langServices = require('../data/languages'),
    moment = require('moment');

function getNthIndex(n, symbol, str) {
    let index = 0,
        count = 0;

    while (count < n && index < str.length) {
        index = str.indexOf(symbol, index + 1);
        count += 1;
    }

    return index;
}

function projectPaste(paste) {
    // kill bug when can
    console.log(paste.timeElapsedFromCreation);
    paste.timeElapsedFromCreation = moment(new Date(paste.dateCreated)).fromNow();
    console.log(paste.timeElapsedFromCreation);
    return paste;
}

module.exports = {
    byId(req, res) {
        const paste = projectPaste(req.paste);

        const mostRecentPastes = req.mostRecent.map(projectPaste);
 
        res.status(200).render('paste-details', {
            user: req.user,
            paste: paste,
            mostRecentPastes: mostRecentPastes
        });
    },
    getCreate(req, res) {
        const languageNames = langServices.getLanguageNamesForDropdown(),
            pastes = req.mostRecent.map(projectPaste);
        
        res.status(200).render('create-paste', {
            user: req.user,
            langNames: languageNames,
            mostRecentPastes: pastes
        });
    },
    create(req, res) {
        // TODO: validation

        const paste = req.body;

        if (!paste.pswd) {
            delete paste.pswd;
        }

        if (req.user) {
            paste.user_id = req.user._id;
        }

        pastesServices
            .createPaste(req.body)
            .then(function (dbRes) {
                const paste = dbRes.ops.pop();

                res.redirect(`/pastes/${paste._id}/details`);
            })
            .catch(d => {
                console.log(d);
                res.json(d)
            });
    },
    byUser(req, res) {
        const user_id = req.user._id;

        pastesServices
            .pastesByUser(user_id)
            .then(pastes => {
                const shortenedPastes = pastes.map(p => {
                    p.content = p.content.slice(0, getNthIndex(5, '\n', p.content));
                    projectPaste(p);

                    return p;
                });

                res.status(200).render('list-pastes', { user: req.user, pastes });
            })
            .catch(error => {
                console.log(error);
                res.redirect(500, '/error');
            });
    }
}