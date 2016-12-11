$(function () {

    const FADEOUT_TIME = 2000; // 2 seconds

    const $themeButtons = $('.dd-paste-theme'),
        $dropDownBtnText = $('#dd-btn-theme-text'),
        $alertContainer = $('#alerts-container'),
        $alertSuccess = $('#alerts-container .alert-success').remove(),
        $alertError = $('#alerts-container .alert-danger').remove();

        // TODO: think of a better way to reuse code
        $alertSuccess.removeClass('collapse');
        $alertError.removeClass('collapse');

    let selectedTheme;

    function toCapitalCase(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    // function showAlert($alertElement, message) {
    //     $alertElement
    //         .find('.alert-msg')
    //         .text(message);
        
    //     $alertElement.removeClass('out');
    //     $alertContainer.append($alertElement);

    //     setTimeout(() => {
    //         $alertElement.addClass('out');
    //     }, FADEOUT_TIME);
    // }

    $themeButtons.on('click', function (ev) {
        selectedTheme = $(ev.target).attr('data-theme');
        $.ajax({
            url: '/profile/settings',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({ settings: { theme: selectedTheme } }),
            success: function () {
                const capitalCasedTheme = toCapitalCase(selectedTheme);
                
                notifier.success(`Paste theme successfully changed to ${capitalCasedTheme}`);
                $dropDownBtnText.text(capitalCasedTheme)
            },
            // TODO: meaningful error handling
            error: () => notifier.failure('Gosho')
        });
    });
});