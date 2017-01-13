'use strict';

$(() => {
    $.fn.copyToClipboardBtn = function (selectorOrFunction) {
        const $this = $(this),
            getText = (typeof selectorOrFunction === 'string') ? 
                        () => $(selectorOrFunction).text() :
                        selectorOrFunction;

        const $tmpInput = $('<textarea />'),
            $body = $(document.body);

        $this.on('click', function () {
            $body.append($tmpInput);
            $tmpInput.val(getText());
            $tmpInput.select();
            document.execCommand('copy');
            $tmpInput.remove();
        });
    }
});