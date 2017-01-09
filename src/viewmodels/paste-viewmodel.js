'use strict';

const moment = require('moment');

module.exports = {
    get name() {
        return 'PasteViewModel';
    },
    customMappings(viewmodel, obj) {
        viewmodel.timeElapsedFromCreation = moment(new Date(obj.dateCreated)).fromNow();
    }
}