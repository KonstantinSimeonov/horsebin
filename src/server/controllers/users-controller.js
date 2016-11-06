'use strict';

const usersServices = require('../data/users-services');

module.exports = {
    getRegistrationForm(req, res) {
        res.status(200).render('_sign-up', { user: req.user });
    },
    register(req, res) {
        console.log(req.body);
        // res.redirect('/sign-up');
        usersServices.createUser(req.body).then(function (dbRes) {
            res.redirect('/pastes/create');
        })
        .catch(function (err) {
            console.log(err);
            res.json(err);
        });
    }
}