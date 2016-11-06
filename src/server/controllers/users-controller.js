'use strict';

module.exports = {
    getRegistrationForm(req, res) {
        res.status(200).render('_sign-up', { user: req.user });
    }
}