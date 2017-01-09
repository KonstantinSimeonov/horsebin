'use strict';

const moment = require('moment');

module.exports = {
    get name() {
        return 'UserPasteViewModel';
    },
    customMappings(viewmodel, obj) {
        viewmodel.timeElapsedFromCreation = moment(new Date(obj.dateCreated)).fromNow();
        viewmodel.content = obj.content.split('\n').slice(0, 5).join('\n');
    }
}