'use strict';

const usersServices = require('../data/users-services'),
    themeServices = require('../data/themes');

module.exports = {
    getRegistrationForm(req, res) {
        res.status(200).render('sign-up', {
            formLegend: 'Fill in you username and password',
            formAction: '/sign-up',
            submitBtnMsg: 'Sign up'
        });
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
    },
    signIn(req, res) {
        res.status(200).render('sign-up', {
            formLegend: 'Fill in you username and password',
            formAction: '/sign-in',
            submitBtnMsg: 'Sign in'
        });
    },
    getProfile(req, res) {
        if (req.user) {
            const themes = themeServices.getDropdownThemes();
            return res.status(200).render('profile', { user: req.user, themes });
        }


        res.status(403).render('error');
    },
    updateSettings(req, res) {
        const settings = req.body.settings;

        settings.theme = settings.theme.toLowerCase();

        console.log(settings);

        usersServices.updateUserSettings(req.user._id, settings).then(result => res.status(200).json(settings));
    }
}