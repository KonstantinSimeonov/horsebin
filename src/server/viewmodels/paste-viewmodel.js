'use strict';

const moment = require('moment');

module.exports = BaseViewModel => class PasteViewModel extends BaseViewModel {
    constructor(obj, takeString) {
        super(obj, takeString);
    }

    customMappings(obj) {
        this.timeElapsedFromCreation = moment(new Date(obj.dateCreated)).fromNow();
    }
}