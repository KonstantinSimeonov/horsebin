'use strict';

const pastesServices = require('../data/pastes-services'),
    langServices = require('../data/languages');

module.exports = {
    byId(req, res) {
        Promise.all([
            pastesServices.getById(req.params.pasteId),
            pastesServices.mostRecentNPastes(5)
        ]).then(function (results) {
            const paste = results[0];
            paste.dateCreated = new Date(paste.dateCreated).toLocaleString('en');

            const mostRecentPastes = results[1];

            mostRecentPastes.forEach(p => p.dateCreated = new Date(p.dateCreated).toLocaleString('en'));

            res.status(200).render('_paste-details', {
                user: req.user,
                paste: paste,
                mostRecentPastes: mostRecentPastes
            });
        })
            .catch(err => console.log(err))
    },
    getCreate(req, res) {

        const languageNames = langServices.getLanguageNamesForDropdown();
        console.log(req.mostRecent);
        res.status(200).render('_create-paste', { user: req.user, langNames: languageNames, mostRecentPastes: req.mostRecent });
    },
    create(req, res) {
        // TODO: validation

        const paste = req.body;

        if(!paste.pswd) {
            delete paste.pswd;
        }

        if(req.user) {
            paste.user_id = req.user._id;
        }

        pastesServices
            .createPaste(req.body)
            .then(function (dbRes) {
                const paste = dbRes.ops.pop();

                res.redirect(`/pastes/${paste._id}/details`);
            })
            .catch(d => { console.log(d); res.json(d) })
    },
    byUser(req, res) {
        const user_id = req.user._id;

        pastesServices
            .pastesByUser(user_id)
            .then(pastes => res.status(200).json(pastes))
            //.catch(err => console.log(err), res.redirect(req.get('referer')));
    }
}