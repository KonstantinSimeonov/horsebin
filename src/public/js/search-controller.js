'use strict';

$(() => {
    const $submitBtn = $('.btn-submit-search'),
        $searchInputs = $('.search-input'),
        $pagination = $('.pagination');

    let pagesCount = +$pagination.attr('pages-count'),
        currentPage = 1,
        pageSize = 10;

    function getFullSearchUrl() {
        const getUrl = '/pastes/search',
            queryParams = $searchInputs.map((_, input) => {
                const $input = $(input),
                    value = $input.val();

                if (!value) {
                    return '';
                }

                return $input.attr('name') + '=' + value;
            });

        return getUrl + `?page=${currentPage}&pageSize=${pageSize}&` + [].slice.call(queryParams).filter(x => x !== '').join('&');
    }

    function fillTable() {
        htmlRequester
            .getHtml(getFullSearchUrl())
            .then(pastesHtml => $('tbody').html(pastesHtml));
    }

    // most terrible pagination ever

    $pagination.append(`<li class="${currentPage === 1 ? 'disabled' : ''}"><a href="#" class="left">&laquo;</a></li>`);

    for (let i = currentPage - 1; i > 1; i -= 1) {
        $pagination.prepend(`<li><a href="#${i - 1}">${i}</a></li>`);
    }

    $pagination.append(`<li><a href="#">${currentPage}</a></li>`);

    for (let i = currentPage + 1; i <= pagesCount; i += 1) {
        $pagination.append(`<li><a href="#">${i}</a></li>`);
    }

    $pagination.append('<li><a href="#" class="right">&raquo;</a></li>');

    const $prev = $pagination.children().first(),
        $next = $pagination.children().last();

    // most terrible pagination ever ends here

    $pagination.on('click', ev => {
        const $target = $(ev.target);

        $pagination.children().removeClass('active');

        if ($target.hasClass('left')) {
            if (currentPage === 1) {
                return;
            }

            if (currentPage === 2) {
                $prev.addClass('disabled');
            }

            $next.removeClass('disables');

            currentPage -= 1;
        } else if ($target.hasClass('right')) {
            if (currentPage === pagesCount) {
                return;
            }

            if (currentPage === pagesCount - 1) {
                $next.addClass('disabled');
            }

            $prev.removeClass('disabled');

            currentPage += 1;
        } else {
            currentPage = +$target.text();
        }

        $pagination.children().eq(currentPage).addClass('active');

        fillTable();
    });

    $submitBtn.on('click', fillTable);

    $pagination.children().eq(1).addClass('active');
    fillTable();
});