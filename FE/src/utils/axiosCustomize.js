import axios from "axios";
import NProgress from "nprogress";
import { store } from '../redux/store'

NProgress.configure({
    showSpinner: false,
    trickleSpeed: 100
});


const instance = axios.create({ baseURL: process.env.REACT_APP_BACKEND_URL });
instance.defaults.withCredentials = true
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
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('error', error.response)
    return error && error.response && error.response.data ?
        error.response.data : Promise.reject(error);
});

export default instance