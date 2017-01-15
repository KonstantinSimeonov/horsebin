'use strict';

module.exports = function (server, middlewares, controllers) {
    const { reportsController } = controllers,
        { authMiddleware } = middlewares;

    server
        .get('/pastes/:pasteId/reports', reportsController.paged)
        .post('/pastes/:pasteId/reports', reportsController.createReport);
}