$(() => {

    const $signUpBtn = $('#sign-up-btn'),
        $overlay = $('<div class="gray-overlay" />');

    $signUpBtn.on('click', ev => {
        $.ajax({
            url: '/sign-up',
            method: 'GET',
            contentType: 'text/html',
            success: function (form) {

                $('body').append($overlay);
                $('body').append($('<section />').html(form))

                $('#btn-submit').on('click', ev => {
                    ev.preventDefault();
                    console.log({
                            username: $('#username-input').val(),
                            pswd: $('#pswd-input').val()
                        });
                    $.ajax({
                        url: '/sign-up',
                        method: 'POST',
                        contentType: 'application/json',
                        data: JSON.stringify({
                            username: $('#username-input').val(),
                            pswd: $('#pswd-input').val()
                        })
                    })
                });

                $('#btn-submit').on('click', ev => {
                    $overlay.remove();
                    $('.dialog-window').remove();
                });
            },
            error: console.log
        });
    });


});