'use strict';

const GitHubStrategy = require('passport-github2'),
    GITHUB = require('../static-config').GITHUB;

const callbackUrl = '/auth/github/callback';

module.exports = (passport, dataServices) => {

    const { users } = dataServices;

    const githubStrategy = new GitHubStrategy({
        clientID: GITHUB.CLIENT_ID,
        clientSecret: GITHUB.CLIENT_SECRET,
        callbackUrl: callbackUrl
    },
        function (accessToken, refreshToken, profile, done) {
            users
                .byGithubId(profile.id)
                .then(user => {
                    if (!user) {
                        return users.createUser({
                            username: profile.username,
                            githubId: profile.id
                        })
                            .then(dbRes => dbRes.ops.pop());
                    }

                    return user;
                })
                .then(user => done(null, user))
                .catch(error => done(error, false));
        });

    passport.use(githubStrategy);
}