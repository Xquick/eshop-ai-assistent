import * as fetchIntercept from 'fetch-intercept';
import {toast} from "vue3-toastify";

export function registerHttpInterceptor() {
    return fetchIntercept.register({
        request: function (url, config) {
            return [url, config];
        },

        requestError: function (error) {
            toast.error(error);

            return Promise.reject(error);
        },

        response: function (response) {
            return response;
        },

        responseError: function (error) {
            return Promise.reject(error);
        },
    });
}
