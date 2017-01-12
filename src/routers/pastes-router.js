'use strict';

module.exports = function (server, dataServices) {
    const pastesController = require('../controllers/pastes-controller')(dataServices),
        authMiddleware = require('../middlewares/authentication-middleware'),
        pastesMiddleware = require('../middlewares/pastes-middleware')(dataServices);

    const mostRecent5Pastes = pastesMiddleware.mostRecentNPastes(5);

    server
        .get('/pastes/:pasteId/details', mostRecent5Pastes, pastesMiddleware.pasteById, pastesController.byId)
        .get('/my-pastes', authMiddleware.isAuthenticated, pastesController.byUser)
        .get('/pastes/create', mostRecent5Pastes, pastesController.getCreate)
        .post('/pastes/create', pastesController.create)
        .get('/pastes', pastesController.getSearch)
        .post('/pastes/:pasteId/edit', pastesController.editContent)
        .get('/pastes/:pasteId/embedded', pastesMiddleware.pasteById, pastesController.embeded)
        .get('/pastes/search', pastesController.paged);
}