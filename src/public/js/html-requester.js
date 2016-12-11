'use strict';

const htmlRequester = (() => {

    const CACHE = Object.create(null);

    function requestHtml(url, data) {
        return new Promise((resolve, reject) => {
            $.ajax({
                url: url,
                method: 'GET',
                contentType: 'application/json',
                data: JSON.stringify(data),
                success: resolve,
                error: reject
            });
        });
    }

    return {
        getHtml(url, data) {
            if (data || !CACHE[url]) {
                return requestHtml(url, data);
            }

            return Promise.resolve(CACHE[url]);
        }
    };
})();