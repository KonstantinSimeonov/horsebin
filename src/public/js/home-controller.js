$(() => {
    'use strict';

    const $signUpBtn = $('#sign-up-btn'),
        $signInBtn = $('#sign-in-btn'),
        $overlay = $('<div class="gray-overlay" />');

    function showForm(serverRoute) {
        return htmlRequester
            .getHtml(serverRoute)
            .then(form => {
                $('body')
                    .append($overlay)
                    .append(form);

                const closeDialog = () => {
                    $overlay.remove();
                    $('.dialog-window').remove();
                };

                $('#btn-submit').on('click', closeDialog);
                $('#btn-close').on('click', closeDialog);

                return Promise.resolve();
            });
    }

    $signUpBtn.on('click', () => {
        showForm('/sign-up')
            .then(() => {
                $('#btn-submit').on('click', ev => {
                    ev.preventDefault();

                    const username = $('#username-input').val(),
                        password = $('#pswd-input').val();

                    jsonRequester
                        .post('/sign-up', { username, password })
                        .then(res => {
                            notifier.success(res.msg);
                        })
                        .catch(err => notifier.failure(err.msg));
                })
            })
    });

    $signInBtn.on('click', () => {
        showForm('/sign-in')
            .then(() => {
                $('#btn-submit').on('click', () => {
                    ev.preventDefault();

                    const username = $('#username-input').val(),
                        password = $('#pswd-input').val();

                    jsonRequester
                        .post('/sign-in', { username, password })
                        .then(res => {
                            notifier.success(res.msg);
                        })
                        .catch(err => notifier.failure(err.msg));
                });
            });
    });
});