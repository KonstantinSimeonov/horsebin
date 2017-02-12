'use strict';

const { UserProfileViewModel } = require('../viewmodels');

module.exports = (dataServices, validate) => {
    const { users, themes } = dataServices;

    return {
        getRegistrationForm(req, res) {
            res.status(200).render('sign-up', {
                formLegend: 'horsebin - Sign up',
                formAction: '/sign-up',
                submitBtnMsg: 'Sign up'
            });
        },
        register(req, res) {
            const user = {
                username: req.body.username,
                password: req.body.password
            }

            const { errors, isValid: isValidUser } = validate.newUser(user);

            if (!isValidUser) {
                return res.status(400).json({
                    success: false,
                    errors: {
                        username: errors.username,
                        password: errors.password
                    }
                });
            }

            users
                .createUser(user)
                .then(dbResponse => {
                    res.status(201).json({ success: true });
                })
                .catch(err => {
                    console.log(err);
                    res.json(err);
                });
        },
        signIn(req, res) {
            res.status(200).render('sign-up', {
                formLegend: 'horsebin - Sign in',
                formAction: '/sign-in',
                submitBtnMsg: 'Sign in'
            });
        },
        getProfile(req, res) {
            if (req.user) {
                const dropdownThemes = themes.getDropdownThemes(),
                    user = new UserProfileViewModel(req.user, '-likedPastesIds');

                return res.status(200).render('profile', { user: req.user, themes: dropdownThemes });
            }

            res.status(403).render('error');
        },
        updateSettings(req, res) {
            const settings = req.body.settings;

            settings.theme = settings.theme.toLowerCase();

            users.updateUserSettings(req.user._id, settings).then(result => res.status(200).json(settings));
        }
    }
}