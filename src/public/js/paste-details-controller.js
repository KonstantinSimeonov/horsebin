'use strict';

$(() => {
    $('#edit-btn').on('click', () => {
        const $editForm = $('.form-edit-paste');

        $editForm.find('textarea').text($('code').text());
        $editForm.removeClass('hidden');
    });
});