'use strict';

const pastesServices = require('../data/pastes-services'),
    langServices = require('../data/languages');

module.exports = {
    byId(req, res) {
        const paste = req.paste;
        paste.dateCreated = new Date(paste.dateCreated).toLocaleString('en');

        const mostRecentPastes = req.mostRecent;

        mostRecentPastes.forEach(p => p.dateCreated = new Date(p.dateCreated).toLocaleString('en'));

        res.status(200).render('_paste-details', {
            user: req.user,
            paste: paste,
            mostRecentPastes: mostRecentPastes
        });
    },
    getCreate(req, res) {
        const languageNames = langServices.getLanguageNamesForDropdown();

        res.status(200).render('_create-paste', {
            user: req.user,
            langNames: languageNames,
            mostRecentPastes: req.mostRecent
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
            })
    },
    byUser(req, res) {
        const user_id = req.user._id;

        pastesServices
            .pastesByUser(user_id)
            .then(pastes => {
                pastes.status(200).json(pastes);
            })
            .catch(error => {
                console.log(error);
                res.redirect(500, '/error');
            });
    }
}