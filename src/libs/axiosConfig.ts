/**
 * @description File name should not be as same as the package name because
 * compiler will try to import from the file instead of the package.
 */
import axios from 'axios';
import toast from 'react-hot-toast';

const $axios = axios.create({
  baseURL: 'https://api.weatherapi.com/v1',
  responseType: 'json',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    key: process.env.NEXT_PUBLIC_WEATHER_API_KEY,
  },
});

/**
 * global request interceptor
 */
$axios.interceptors.request.use((config) => {
  return config;
});

/**
 * global error handler
 */
$axios.interceptors.response.use(
  (res) => res,
  (e) => {
    if (e.response?.status && e.response.status >= 500) {
      toast.error('Internal server error. Please try again later.');
      return Promise.reject();
    }
    if (e.response?.status && e.response.status === 403) {
      toast.error('You are not allowed to do that.');
      return Promise.reject();
    }
    if (e.response?.status && e.response.status === 400) {
      toast.error(e.response?.data?.message);
      return Promise.reject(e.response?.data);
    }
    throw e;
  },
);

export default $axios;
