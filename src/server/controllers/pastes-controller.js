'use strict';

const pastesServices = require('../data/pastes-services');

module.exports = {
    byId(req, res) {
        pastesServices
            .getById(req.params.pasteId)
            .then(d => { console.log(d); res.status(200).json(d); })
            .catch(err => console.log(err, res.status(500).send('hui')))
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