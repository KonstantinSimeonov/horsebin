'use strict';

const pastesController = require('../controllers/pastes-controller'),
    authentication = require('../server-config/authentication'),
    pastesMiddleware = require('../middlewares/pastes-middleware');

module.exports = function (server) {
    server
        .get('/pastes/:pasteId/details', pastesController.byId)
        .get('/my-pastes', authentication.isAuthenticated, pastesController.byUser)
        .get('/pastes/create', pastesMiddleware.mostRecentNPastes(5), pastesController.getCreate)
        .post('/pastes/create', pastesController.create);
}