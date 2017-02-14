'use strict';

const fs = require('fs'),
    path = require('path');

let CACHE;

module.exports = [
    function getLanguageNamesForDropdown() {
        if(!CACHE) {
            const prismJsPath = path.join(__dirname, '../public/bower_components/prism/components'),
            languageNames = fs.readdirSync(prismJsPath)
                                        // take every second element because there are minified files
                                        .filter((_, i) => i & 1)
                                        // file names are in the format 'prism-LANG.min.js'
                                        .map(x => x.split('-')
                                                    .pop()
                                                    .split('.')
                                                    .shift());

            CACHE = languageNames;
        }
        
        return CACHE;
    }
]