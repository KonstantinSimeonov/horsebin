$(function () {

    const $themeButtons = $('.dd-paste-theme');

    $themeButtons.on('click', function (ev) {
        const selectedTheme = $(ev.target).attr('data-theme');
        $.ajax({
            url: '/profile/settings',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({ settings: { theme: selectedTheme } })
        })
        .done((response) => {
            console.log('dun');
        });
    });

});