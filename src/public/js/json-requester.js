'use strict';

const jsonRequester = (() => {

    function ajaxOptions(method, data, resolve, reject) {
        return {
            method: method,
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: resolve,
            error: (request, textStatus, errorThrown) => reject({
                reason: textStatus,
                data: JSON.parse(request.responseText),
                errorThrown
            })
        }
    }

    return {
        get(url, params) {
            return new Promise((resolve, reject) => {
                const queryParams = '?' + Object.keys(params).map(n => n + '=' + params[n]).join('&');

                $.ajax(url + queryParams, {
                    method: 'GET',
                    contentType: 'application/json',
                    success: resolve,
                    error: reject
                });
            })
        },
        post(url, data) {
            return new Promise((resolve, reject) => $.ajax(url, ajaxOptions('POST', data, resolve, reject)));
        },
        put(url, data) {
            return new Promise((resolve, reject) => $.ajax(url, ajaxOptions('PUT', data, resolve, reject)));
        },
        delete(url, data) {
            return new Promise((resolve, reject) => $.ajax(url, ajaxOptions('DELETE', data, resolve, reject)));
        }
    };
})();