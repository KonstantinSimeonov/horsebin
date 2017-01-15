'use strict';

module.exports = {
    get name() {
        return 'UserProfileViewModel';
    },
    customMappings(viewmodel, obj) {
        if(!obj.settings) {
            viewmodel.settings = { theme: 'okaidia' };
        } else if(!obj.settings.theme) {
            viewmodel.settings.theme = 'okaidia';
        } else {
            viewmodel.settings = obj.settings;
        }

        let theme = viewmodel.settings.theme;
        viewmodel.settings.theme = theme[0].toUpperCase() + theme.slice(1);
    }
};