'use strict';

// check if a string starts with another string
function startsWith(str, start) {
    if (str.length < start.length) {
        return false;
    }

    for (let i = 0, len = start.length; i < len; i += 1) {
        if (str[i] !== start[i]) {
            return false;
        }
    }

    return true;
}

const fs = require('fs'),
    path = require('path');

let CACHE;

module.exports = {
    getDropdownThemes() {

        if (!CACHE) {

            const themesDir = path.join(__dirname, '../../public/bower_components/prism/themes/');

            CACHE = fs.readdirSync(themesDir)
                            .filter(fn => startsWith(fn, 'prism-'))
                            .map(fn => fn.split('prism-')
                                        .pop()
                                        .split('.')
                                        .shift())
                            .map(themeName => themeName[0].toUpperCase() + themeName.slice(1));
        }

        return CACHE;
    }
}