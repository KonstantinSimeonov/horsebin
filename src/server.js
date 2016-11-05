'use strict';

const express = require('express'),
    server = express(),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    PORT = process.env.PORT || 3001;

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));

require('./routers')(server);

server.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));