'use strict';

const pastesController = require('../controllers/pastes-controller'),
    authentication = require('../server-config/authentication');

module.exports = function (server) {
    server
        .get('/pastes/:pasteId/details', pastesController.byId)
        .get('/my-pastes', authentication.isAuthenticated, pastesController.byUser)
        .get('/pastes/create', pastesController.getCreate)
        .post('/pastes/create', pastesController.create);
}