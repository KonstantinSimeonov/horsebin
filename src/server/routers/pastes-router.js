'use strict';

const pastesController = require('../controllers/pastes-controller');

module.exports = function (server) {
    server
        .get('/pastes/:pasteId/details', pastesController.byId)
        .get('/pastes/create', pastesController.getCreate)
        .post('/pastes/create', pastesController.create);
}