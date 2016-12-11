'use strict';

$(() => {
    const $signUpBtn = $('#sign-up-btn'),
        $signInBtn = $('#sign-in-btn'),
        $overlay = $('<div class="gray-overlay" />');

    function closeDialog() {
        $overlay.remove();
        $('.dialog-window').remove();
    }

    function showForm(serverRoute) {
        return htmlRequester
            .getHtml(serverRoute)
            .then(form => {
                $('body')
                    .append($overlay)
                    .append(form);

                $('#btn-close').on('click', closeDialog);

                return Promise.resolve();
            });
    }

    function onSignInSuccess(res, username) {
        notifier.success(res.msg);
        closeDialog();

        $('#username').text(username);
        $('#user-menu').html(`
            <li><a href="/profile">Profile</a></li>
            <li><a href="/sign-out">Sign out</a></li>
        `);
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
                        .then(() => {
                            return jsonRequester.post('/sign-in', { username, password });
                        })
                        .then(res => onSignInSuccess(res, username))
                        .catch(err => notifier.failure(err.msg));
                });
            });
    });

    $signInBtn.on('click', () => {
        showForm('/sign-in')
            .then(() => {
                $('#btn-submit').on('click', ev => {
                    ev.preventDefault();

                    const username = $('#username-input').val(),
                        password = $('#pswd-input').val();

                    console.log($('input'));

                    jsonRequester
                        .post('/sign-in', { username, password })
                        .then(res => onSignInSuccess(res, username))
                        .catch(err => notifier.failure(err.msg));
                });
            });
    });
});