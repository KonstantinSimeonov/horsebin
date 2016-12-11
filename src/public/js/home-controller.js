$(() => {
    'use strict';

    const $signUpBtn = $('#sign-up-btn'),
        $signInBtn = $('#sign-in-btn'),
        $overlay = $('<div class="gray-overlay" />');

    function getForm(getUrl, postUrl) {
        return () => {
            htmlRequester
            .getHtml(getUrl)
            .then(form => {
                $('body').append($overlay);
                $('body').append($('<section />').html(form))

                $('#btn-submit').on('click', ev => {
                    ev.preventDefault();

                    $.ajax({
                        url: postUrl,
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            username: $('#username-input').val(),
                            password: $('#pswd-input').val()
                        }),
                        success: console.log
                    });
                });

                const closeDialog = () => {
                    $overlay.remove();
                    $('.dialog-window').remove();
                };

                $('#btn-submit').on('click', closeDialog);
                $('#btn-close').on('click', closeDialog);
            })
            .catch(console.log);
        }
    }


    $signInBtn.on('click', ev => {
        htmlRequester
            .getHtml('/sign-in')
            .then(form => {
                $('body').append($overlay);
                $('body').append(form);

                $('#btn-submit').on('click', ev => {
                    ev.preventDefault();

                    $.ajax({
                        url: '/sign-in',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            username: $('#username-input').val(),
                            password: $('#pswd-input').val()
                        }),
                        success: console.log,
                        error: (fail) => {
                            console.log(fail.responseJSON.msg);
                            alert('fail')
                        }
                    });
                });

                const closeDialog = () => {
                    $overlay.remove();
                    $('.dialog-window').remove();
                };

                $('#btn-submit').on('click', closeDialog);
                $('#btn-close').on('click', closeDialog);
            });
    });

    // $signUpBtn.on('click', ev => {
    //     htmlRequester
    //         .getHtml('/sign-up')
    //         .then(form => {
    //             $('body').append($overlay);
    //             $('body').append($('<section />').html(form))

    //             const onSubmitClick = ev => {
    //                 ev.preventDefault();

    //                 $.ajax({
    //                     url: '/sign-up',
    //                     method: 'POST',
    //                     contentType: 'application/json',
    //                     data: JSON.stringify({
    //                         username: $('#username-input').val(),
    //                         pswd: $('#pswd-input').val()
    //                     })
    //                 });
    //             };
    //             $('#btn-submit').on('click', onSubmitClick);

    //             const closeDialog = ev => {
    //                 $overlay.remove();
    //                 $('.dialog-window').remove();
    //             };

    //             $('#btn-submit').on('click', closeDialog);
    //             $('#btn-close').on('click', closeDialog);
    //         })
    //         .catch(console.log);
    // });
});