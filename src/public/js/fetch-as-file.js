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
            pasteName = $container.find('.paste-name').text();

        let type = $container.find('pre').attr('class').split('-').pop();

        if(filetypeMap[type]) {
            type = filetypeMap[type];
        }

        window.URL = window.URL || window.webkitURL;
        const blob = new Blob([contents], {type: 'octet/stream'});

        blob.lastModifiedDate = new Date();
        blob.name = pasteName;

        $fetchBtn.attr('download', pasteName + '.' + type);
        $fetchBtn.attr('href', window.URL.createObjectURL(blob));
    });
});