import axios from "axios";
import NProgress from "nprogress";
import { store } from '../redux/store'
import { toast } from 'react-toastify';

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
});

const instance = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });

// Add a request interceptor
instance.interceptors.request.use(function (config) {
    //console.log('check store', store.getState());
    const access_token = store?.getState()?.auth?.account?.access_token
    config.headers['Authorization'] = `Bearer ${access_token}`
    //console.log('config.headers', config.headers['Authorization']);
    NProgress.start();
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
    NProgress.done();
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response && response.data ? response.data : response;
    // lọc dữ liệu trả về chỉ có data ko có gì khác
}, function (error) {
    NProgress.done();
    if (error.response.data && error.response.data.EC === -999) {
        window.location.href = '/login'
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = (error && error.response && error.response.status) || 500;
    switch (status) {
        // authentication (token related issues)
        case 401: {
            if (window.location.pathname !== '/'
                && window.location.pathname !== '/login'
                && window.location.pathname !== '/register') {
                toast.error('Unauthorized the user. Please login ..')
            }
            return error.response.data;
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error('Bạn không có quyền truy cập')
            return Promise.reject(error);
        }

        // bad request
        case 400: {
            return Promise.reject(error);
        }

        // not found
        case 404: {
            return Promise.reject(error);
        }

        // conflict
        case 409: {
            return Promise.reject(error);
        }

        // unprocessable
        case 422: {
            return Promise.reject(error);
        }

        // generic api error (server related) unexpected
        default: {
            return Promise.reject(error);
        }
    }
});

export default instance