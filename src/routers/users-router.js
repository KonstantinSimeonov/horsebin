'use strict';

module.exports = function (server, middlewares, controllers) {
    const { usersController } = controllers,
        { authMiddleware } = middlewares;

    server
        .get('/profile', authMiddleware.isAuthenticated, usersController.getProfile)
        .post('/profile/settings', authMiddleware.isAuthenticated, usersController.updateSettings)
        .get('/sign-up', usersController.getRegistrationForm)
        .post('/sign-up', usersController.register)
        .get('/sign-in', usersController.signIn)
        .get('/auth/github', authMiddleware.loginGithub)
        .get('/auth/github/callback', authMiddleware.loginGithubCallback, (req, res) => res.redirect('/home'))
        .post('/sign-in', authMiddleware.loginLocal)
        .get('/sign-out', authMiddleware.isAuthenticated, authMiddleware.logout)
}