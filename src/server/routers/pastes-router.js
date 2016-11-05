'use strict';

const pastesController = require('../controllers/pastes-controller');

module.exports = function (server) {
    server
        .get('/pastes/:pasteId/details', pastesController.byId)
        .post('/pastes', pastesController.create);
}