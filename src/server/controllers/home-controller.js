'use strict';

module.exports = {
    index(req, res) {
        res.status(200).render('home', { user: req.user });
    }
}