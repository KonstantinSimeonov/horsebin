$(function () {

    const $themeButtons = $('.dd-paste-theme'),
        $dropDownBtnText = $('#dd-btn-theme-text'),
        $notificationContainer = $('#notification-container');

    let selectedTheme;

    function toCapitalCase(str) {
        return str[0].toUpperCase() + str.slice(1);
    }

    // TODO: refactor!
    function success() {
        $dropDownBtnText.text(toCapitalCase(selectedTheme));
        
        $notificationContainer
            .html(`<div class="alert alert-dismissible alert-success fade active in">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>Success!</strong> Paste theme changes to <em>${toCapitalCase(selectedTheme)}</em>.
</div>`);
        // set fade out after 3 secs
        setTimeout(() => {
            $notificationContainer.children().fadeOut(3000);
        }, 3000);

        // remove from dom after 10 secs
        setTimeout(() => {
            $notificationContainer.empty();
        }, 10000);
    }

    // TODO: refactor!
    function error(err) {
        {
            $notificationContainer
                .html(`<div class="alert alert-dismissible alert-danger">
  <button type="button" class="close" data-dismiss="alert">&times;</button>
  <strong>${err}</strong>
</div>`);
            // set fade out after 3 secs
            setTimeout(() => {
                $notificationContainer.children().fadeOut(3000);
            }, 3000);

            // remove from dom after 10 secs
            setTimeout(() => {
                $notificationContainer.empty();
            }, 10000)
        }
    }

    $themeButtons.on('click', function (ev) {
        selectedTheme = $(ev.target).attr('data-theme');
        $.ajax({
            url: '/profile/settings',
            contentType: 'application/json',
            method: 'POST',
            data: JSON.stringify({ settings: { theme: selectedTheme } }),
            error,
            success
        });
    });
});