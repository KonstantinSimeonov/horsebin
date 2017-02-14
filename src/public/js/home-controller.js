'use strict';

$(() => {
    // damn you browser autocomplete
    $('input, textarea').attr('readonly', true);
    $(document).on('focus', 'input, textarea', ev => $(ev.target).removeAttr('readonly'));

    const $signUpBtn = $('#sign-up-btn'),
        $signInBtn = $('#sign-in-btn'),
        $overlay = $('<div class="gray-overlay" />');

    function closeDialog() {
        const $dialogWindow = $('.dialog-window');
        $dialogWindow.remove().removeAttr('open');
        $overlay.remove();
    }

    function showForm(serverRoute) {
        return htmlRequester
            .getHtml(serverRoute)
            .then(form => {
                $overlay.appendTo($(document.body));
                $(form).attr('open', true).appendTo($(document.body));

                $('#btn-close').on('click', closeDialog);

                return Promise.resolve();
            });
    }

    function onSignInSuccess(res, username) {
        notifier.success(res.message);
        closeDialog();

        $('#username').text(username);
        $('#user-menu').html(`
            <li><a href="/profile">Profile</a></li>
            <li><a href="/sign-out">Sign out</a></li>
        `);

        $('.nav.navbar-nav.navbar-right').prepend($('<li><a href="/my-pastes">My pastes</a></li>'));

        $('.heart').addClass('logged');
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
                        .catch(res => {
                            const { errors: { username, password } } = res.data;

                            if (username.length) {
                                notifier.failure('Invalid username!');

                                $('.username-constraints')
                                    .removeClass('text-info')
                                    .addClass('text-danger');
                            } else {
                                $('.username-constraints')
                                    .removeClass('text-danger')
                                    .addClass('text-info');
                            }

                            if (password.length) {
                                notifier.failure('Invalid password!');

                                $('.password-constraints')
                                    .removeClass('text-info')
                                    .addClass('text-danger');
                            } else {
                                $('.password-constraints')
                                    .removeClass('text-danger')
                                    .addClass('text-info');
                            }
                        });
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

                    jsonRequester
                        .post('/sign-in', { username, password })
                        .then(res => onSignInSuccess(res, username))
                        .catch(res => notifier.failure(res.data.message));
                });
            });
    });

});