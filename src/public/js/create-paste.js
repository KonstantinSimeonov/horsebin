$(function () {
    const $visibilityControls = $('#visibility-controls'),
        $passwordControls = $('#password-controls'),
        $pswdInput = $('#paste-pswd'),
        $revealPassBtn = $('#reveal-btn');

    $visibilityControls.on('click', function (ev) {
        const $target = $(ev.target);

        if($target.attr('id') === 'private-btn') {
            $passwordControls.removeClass('collapse');
        } else {
            $passwordControls.addClass('collapse');
        }
    });

    $revealPassBtn.on('click', function () {
        if($pswdInput.attr('type') === 'password') {
            $pswdInput.attr('type', 'text');
            $revealPassBtn.text('Hide');
        } else {
            $pswdInput.attr('type', 'password');
            $revealPassBtn.text('Reveal');
        }
    });
});