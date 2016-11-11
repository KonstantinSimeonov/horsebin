$(() => {
    'use strict';

    const $signUpBtn = $('#sign-up-btn'),
        $overlay = $('<div class="gray-overlay" />');

    // TODO: refactor this ****
    $signUpBtn.on('click', ev => {
        $.ajax({
            url: '/sign-up',
            method: 'GET',
            contentType: 'text/html',
            success: function (form) {

                $('body').append($overlay);
                $('body').append($('<section />').html(form))

                const onSubmitClick = ev => {
                    ev.preventDefault();

                    $.ajax({
                        url: '/sign-up',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            username: $('#username-input').val(),
                            pswd: $('#pswd-input').val()
                        })
                    });
                };
                $('#btn-submit').on('click', onSubmitClick);

                const closeDialog = ev => {
                    $overlay.remove();
                    $('.dialog-window').remove();
                };

                $('#btn-submit').on('click', closeDialog);
                $('#btn-close').on('click', closeDialog);
            },
            error: console.log
        });
    });


});