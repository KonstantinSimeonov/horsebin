'use strict';

module.exports = {
    getRegistrationForm(req, res) {
        res.status(200).render('sign-up');
    }
}