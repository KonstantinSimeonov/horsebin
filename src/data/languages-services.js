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
                                                    .shift())
                                        // capital case
                                        .map(langName => langName[0].toUpperCase() + langName.slice(1));

            CACHE = languageNames;
        }
        
        return CACHE;
    }
]