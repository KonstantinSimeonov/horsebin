'use strict';

const dataServices = require('../data'),
    pastesController = require('../controllers/pastes-controller')(dataServices),
    authMiddleware = require('../middlewares/authentication-middleware'),
    pastesMiddleware = require('../middlewares/pastes-middleware')(dataServices);

const mostRecent5Pastes = pastesMiddleware.mostRecentNPastes(5);

module.exports = function (server) {
    server
        .get('/pastes/:pasteId/details', mostRecent5Pastes, pastesMiddleware.pasteById, pastesController.byId)
        .get('/my-pastes', authMiddleware.isAuthenticated, pastesController.byUser)
        .get('/pastes/create', mostRecent5Pastes, pastesController.getCreate)
        .post('/pastes/create', pastesController.create)
        .get('/pastes', pastesController.paged);
}