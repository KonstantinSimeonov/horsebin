'use strict';

const GitHubStrategy = require('passport-github2'),
    users = require('../data/users-services'),
    GITHUB = require('../static-config').GITHUB;

const callbackUrl = 'http://127.0.0.1:3001/auth/github/callback';

const githubStrategy = new GitHubStrategy({
    clientID: GITHUB.CLIENT_ID,
    clientSecret: GITHUB.CLIENT_SECRET,
    callbackUrl: callbackUrl
},
    function (accessToken, refreshToken, profile, done) {
        console.log(profile.id);
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

module.exports = githubStrategy;