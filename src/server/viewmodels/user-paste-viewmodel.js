'use strict';

const moment = require('moment');

module.exports = BaseViewModel => class UserPasteViewModel extends BaseViewModel {
    constructor(obj, takeString) {
        super(obj, takeString);
    }

    customMappings(obj) {
        this.timeElapsedFromCreation = moment(new Date(obj.dateCreated)).fromNow();
        this.content = obj.content.split('\n').slice(0, 5).join('\n');
    }
}