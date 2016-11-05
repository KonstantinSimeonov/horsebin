'use strict';

module.exports = function (server) {
    server.get('*', (req, res) => res.status(404).send('<h1>Not found!</h1>'));
}