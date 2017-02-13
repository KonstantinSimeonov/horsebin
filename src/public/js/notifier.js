'use strict';

const notifier = (() => {

    const DEFAULT_FADEOUT = 3000;

    const $success = $(`<div class="alert alert-dismissible alert-success fading">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Success!</strong> <em class="alert-msg"></em>
    </div>`),
        $failure = $(`<div class="alert alert-dismissible alert-danger fading">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <strong>Error!</strong>
        <em class="alert-msg"></em>`),
        $alertsContainer = $('<div id="alerts-container" />').appendTo($('body'));

    function showAlert($alertElement, message, fadeTime) {
        $alertElement.find('.alert-msg').text(message);
        $alertElement.appendTo($alertsContainer).removeClass('hidden');
        
        setTimeout(() => {
            $alertElement.addClass('hidden');
        }, +fadeTime || DEFAULT_FADEOUT);
    }

    return {
        success: showAlert.bind(null, $success),
        failure: showAlert.bind(null, $failure)
    }
})();