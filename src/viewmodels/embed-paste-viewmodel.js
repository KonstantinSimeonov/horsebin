'use strict';

const PrismLoader = require('./prism-loader'),
    prismComponents = require('./prism-components'),
    languages = Object.keys(prismComponents.languages);

const Prism = PrismLoader.createInstance(languages);

module.exports = {
    get name() {
        return 'EmbedPasteViewModel';
    },
    customMappings(viewModel, obj) {
        if(typeof obj.lang === 'string') {
            const langToLower = obj.lang.toLowerCase();
            viewModel.content = Prism.highlight(obj.content, Prism.languages[langToLower]);
        } else {
            viewModel.content = obj.content;
        }
    }
}