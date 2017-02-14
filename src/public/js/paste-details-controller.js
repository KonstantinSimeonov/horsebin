'use strict';

$(() => {
    const $cloneBtn = $('#clone-btn'),
        $copyUrlBtn = $('#copy-url-btn'),
        $heartBtn = $('#heart-btn'),
        $likesCounter = $heartBtn.find('.likes-counter');

    $cloneBtn.copyToClipboardBtn('code');
    $copyUrlBtn.copyToClipboardBtn(() => window.location.href);

    const $embedBtn = $('#btn-get-embedded'),
        rawUrl = 'https://' + window.location.host + $embedBtn.data('url'),
        height = $('pre code').css('height');

    $embedBtn.copyToClipboardBtn(() => `<iframe width="600" height="${height}" style="font-size: 18px;" src="${rawUrl}" frameborder="0" allowfullscreen></iframe>`);

    $('#edit-btn').on('click', () => {
        const $editForm = $('.form-edit-paste');

        $editForm.find('textarea').text($('code').text());
        $editForm.removeClass('hidden');
    });

    $heartBtn.on('click', ev => {
        const $target = $(ev.target);

        if(!$target.hasClass('logged')) {
            return $('#sign-in-btn').click();
        }

        const pasteId = $(ev.target).data('paste_id');

        jsonRequester
            .post(`/pastes/${pasteId}/heart`, {})
            .then(paste => {
                console.log(paste);
                $likesCounter.text(~~paste.likesCount);
                $heartBtn.toggleClass('heart-inverse');
            })
            .catch(failure => console.log(failure) || notifier.failure(failure.msg));
    });

});