'use strict';

const fs = require('fs'),
    path = require('path');

let cachedNames;

module.exports = {
    getLanguageNamesForDropdown() {
        if(cachedNames) {
            return cachedNames;
        }

        const prismJsPath = '../../node_modules/prismjs/components/';

        const languageNames = fs.readdirSync(path.join(__dirname, prismJsPath))
                                    .map(x => x.split('-')
                                                .pop()
                                                .split('.')
                                                .shift())
                                    .filter((x, i) => i & 1);

        cachedNames = languageNames;

        return cachedNames;
    }
}