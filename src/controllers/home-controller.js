'use strict';

module.exports = _ => ({
    index(req, res) {
        res.redirect('/pastes/create');
    }
});