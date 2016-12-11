'use strict';

const htmlRequester = (() => {

    const CACHE = Object.create(null);

    function requestHtml(url) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'GET',
                contentType: 'application/json',
                success: resolve,
                error: reject
            });
        });
    }

    return {
        getHtml(url) {
            if (!CACHE[url]) {
                return requestHtml(url);
            }

            return Promise.resolve(CACHE[url]);
        }
    };
})();