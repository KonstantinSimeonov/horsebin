'use strict';

$(function () {
    const $tmpInput = $('<textarea />'),
        $cloneBtn = $('#clone-btn'),
        $body = $(document.body);

    $cloneBtn.on('click', function () {
        $body.append($tmpInput);
        $tmpInput.val($('code').text());
        $tmpInput.select();
        document.execCommand('copy');
        $tmpInput.remove();
    });
});