'use strict';

const fs = require('fs'),
    path = require('path');

let CACHE;

module.exports = {
    getDropdownThemes() {

        if (!CACHE) {

            const themesDir = path.join(__dirname, '../public/bower_components/prism/themes/');

            CACHE = fs.readdirSync(themesDir)
                            .filter(fn => fn.startsWith('prism-'))
                            .map(fn => fn.split('prism-')
                                        .pop()
                                        .split('.')
                                        .shift())
                            .map(themeName => themeName[0].toUpperCase() + themeName.slice(1));
        }

        return CACHE;
    }
}