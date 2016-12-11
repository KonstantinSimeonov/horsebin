'use strict';

const jsonRequester = (() => {
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
            return new Promise((resolve, reject) => {
                $.ajax(url, {
                    method: 'POST',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: resolve,
                    error: reject
                })
            });
        },
        put(url, data) {
            return new Promise((resolve, reject) => {
                $.ajax(url, {
                    method: 'PUT',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: resolve,
                    error: reject
                })
            });
        },
        delete(url, data) {
            return new Promise((resolve, reject) => {
                $.ajax(url, {
                    method: 'DELETE',
                    contentType: 'application/json',
                    data: JSON.stringify(data),
                    success: resolve,
                    error: reject
                })
            });
        }
    };
})();