'use strict';

const pastesController = require('../controllers/pastes-controller'),
    authentication = require('../server-config/authentication'),
    pastesMiddleware = require('../middlewares/pastes-middleware');

const mostRecent5Pastes = pastesMiddleware.mostRecentNPastes(5);

module.exports = function (server) {
    server
        .get('/pastes/:pasteId/details', mostRecent5Pastes, pastesMiddleware.pasteById, pastesController.byId)
        .get('/my-pastes', authentication.isAuthenticated, pastesController.byUser)
        .get('/pastes/create', mostRecent5Pastes, pastesController.getCreate)
        .post('/pastes/create', pastesController.create);
}