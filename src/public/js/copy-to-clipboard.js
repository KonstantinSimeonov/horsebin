'use strict';

$(() => {
    $.fn.copyToClipboardBtn = function (textContainerSelector) {
        const $this = $(this),
            $container = $(textContainerSelector);

        const $tmpInput = $('<textarea />'),
            $body = $(document.body);

        $this.on('click', function () {
            $body.append($tmpInput);
            $tmpInput.val($(textContainerSelector).text());
            $tmpInput.select();
            document.execCommand('copy');
            $tmpInput.remove();
        });
    }

    $('#clone-btn').copyToClipboardBtn('code');
});