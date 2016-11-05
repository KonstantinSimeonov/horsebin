'use strict';

module.exports = function (server) {
    server.get('*', (req, res) => res.status(404).render('not-found', { msg: 'Govno!' }));
}