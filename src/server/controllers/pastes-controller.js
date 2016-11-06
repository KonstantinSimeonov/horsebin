'use strict';

const pastesServices = require('../data/pastes-services');

module.exports = {
    byId(req, res) {
        pastesServices
            .getById(req.params.pasteId)
            //.then(p => res.status(200).json(p))
            .then(function (paste){
                console.log(paste.dateCreated);
                var t = new Date(paste.dateCreated);
                paste.dateCreated = t.toLocaleString('en');
                console.log(paste.dateCreated);
                res.status(200).render('_paste-details', { user: req.user, paste: paste });
            })
            .catch(err => console.log(err))
    },
    getCreate(req, res) {
        res.status(200).render('_create-paste', { user: req.user })
    },
    create(req, res) {
        // TODO: validation
        pastesServices
            .createPaste(req.body)
            .then(function (dbRes) {
                const paste = dbRes.ops.pop();

                res.redirect(`/pastes/${paste._id}/details`);
            })
            .catch(d => {console.log(d); res.json(d)})
    }
}