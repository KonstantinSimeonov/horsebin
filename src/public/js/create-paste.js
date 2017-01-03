'use strict';

$(function () {
    
    const $visibilityControls = $('#visibility-controls'),
        $passwordControls = $('#password-controls'),
        $pswdInput = $('#paste-pswd'),
        $revealPassBtn = $('#reveal-btn'),
        $langsAutocomplete = $('#available-langs'),
        $langInput = $('#paste-lang');

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

    $langInput.on('input', () => {
        const val = $langInput.val();

        let matchedLang = false;

        $langsAutocomplete.children().each((_, e) => {
            const $e = $(e);

            if(val.length && $e.text().indexOf(val) !== -1) {
                $e.removeClass('hidden');
                matchedLang = true;
            } else {
                $e.addClass('hidden');
            }
        });

        if(matchedLang) {
            $langsAutocomplete.removeClass('hidden');
        } else {
            $langsAutocomplete.addClass('hidden');
        }
    });

    $langsAutocomplete.on('click', ev => {
        const $target = $(ev.target);

        $langInput.val($target.text());
    });

    $(document).on('click', () => {
        $langsAutocomplete.addClass('hidden');        
    });
});