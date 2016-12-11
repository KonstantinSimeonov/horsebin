'use strict';

$(function () {
    // TODO: expand
    const filetypeMap = {
        'javascript': 'js',
        'haskell': 'hs'
    };

    const $fetchBtn = $('#fetch-btn'),
        $container = $('#paste-details');

    $fetchBtn.on('click', function () {
        const contents = $container.find('code').text(),
            pasteName = $container.find('.paste-name').text(),
            language = $container
                            .find('pre')
                            .attr('class')
                            .split('-')
                            .pop(),
            fileExtension = filetypeMap[language] || language;

        

        window.URL = window.URL || window.webkitURL;
        const blob = new Blob([contents], {type: 'octet/stream'});

        blob.lastModifiedDate = new Date();
        blob.name = pasteName;

        $fetchBtn.attr('download', pasteName + '.' + fileExtension);
        $fetchBtn.attr('href', window.URL.createObjectURL(blob));
    });
});