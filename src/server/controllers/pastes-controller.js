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

        res.status(200).render('_create-paste', { user: req.user, langNames: languageNames });
    },
    create(req, res) {
        // TODO: validation
        pastesServices
            .createPaste(req.body)
            .then(function (dbRes) {
                const paste = dbRes.ops.pop();

                res.redirect(`/pastes/${paste._id}/details`);
            })
            .catch(d => { console.log(d); res.json(d) })
    }
}