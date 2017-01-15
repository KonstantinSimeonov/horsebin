'use strict';

const express = require('express'),
    server = express(),
    kleiDust = require('klei-dust'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    dataServices = require('./data'),
    path = require('path'),
    PORT = process.env.PORT || 3001;

/* config start */
server.use('/public', express.static(path.join(__dirname, './public')));

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(cookieParser());

server.set('views', __dirname + '/views');
server.engine('dust', kleiDust.dust);
server.set('view engine', 'dust');
server.set('view options', { layout: false });

// config auth
require('./auth-config/passport')(server, dataServices);

/* config end */

// routing
const controllers = require('./controllers')(dataServices),
    middlewares = require('./middlewares')(dataServices);

require('./routers')(server, middlewares, controllers);

server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));