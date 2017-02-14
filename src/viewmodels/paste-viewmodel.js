'use strict';

const moment = require('moment'),
    prismComponents = require('./prism-components'),
    languages = prismComponents.languages;

// TODO: ideally should be done at build time, not runtime
const CACHE = Object.create(null);

function getDependencyComponents(lang, languages) {
    if (!CACHE[lang]) {


        const dependencies = [lang];

        let currentLang = lang;

        while (languages[currentLang] && languages[currentLang].require) {
            currentLang = languages[currentLang].require;
            dependencies.push(currentLang);
        }

        CACHE[lang] = dependencies.reverse();
    }

    return CACHE[lang];
}

module.exports = {
    get name() {
        return 'PasteViewModel';
    },
    customMappings(viewmodel, obj) {
        viewmodel.name = obj.name || 'no title';

        if (typeof obj.lang === 'string') {
            viewmodel.lang = obj.lang.toLowerCase();
            viewmodel.dependencies = getDependencyComponents(viewmodel.lang, languages).map(langName => langName.toLowerCase());
        }

        console.log(obj);

        const bytesCount = Buffer.byteLength(obj.content || '', 'utf16');
        if(bytesCount < 100) {
            viewmodel.size = bytesCount + ' bytes';
        } else {
            viewmodel.size = Math.round(bytesCount / 100) / 10 + ' KB';
        }

        viewmodel.timeElapsedFromCreation = moment(new Date(obj.dateCreated)).fromNow();
    }
}