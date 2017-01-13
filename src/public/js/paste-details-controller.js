'use strict';

$(() => {
    $('#clone-btn').copyToClipboardBtn('code');
    console.log('hey');
    $('#copy-url-btn').copyToClipboardBtn(() => window.location.href);
    
    const $embedBtn = $('#btn-get-embedded');
    const rawUrl = window.location.host + $embedBtn.data('url');
    $embedBtn.copyToClipboardBtn(() => `<iframe width="560" height="315" src="${rawUrl}" frameborder="0" allowfullscreen></iframe>`);

    $('#edit-btn').on('click', () => {
        const $editForm = $('.form-edit-paste');

        $editForm.find('textarea').text($('code').text());
        $editForm.removeClass('hidden');
    });

});