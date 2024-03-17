import axios, { AxiosError } from 'axios';
import Toast from 'react-native-toast-message';
import { logOut, store } from '../store';

const $apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  withCredentials: true,
});

const handleError = (error: Error | AxiosError) => {
  console.error('IError', error);
  if (axios.isAxiosError(error) && !!error.response?.data?.message) {
    switch (error.response.status) {
      case 401:
      case 403:
        store.dispatch(logOut());
        break;
      default:
        break;
    }
    Toast.show({ type: 'error', text1: error.response.data.message });
    return Promise.reject(error.response.data);
  } else {
    Toast.show({ type: 'error', text1: error.message });
    return Promise.reject(error);
  }
};

$apiClient.interceptors.request.use(config => {
  if (config.headers) {
    config.headers['Content-Type'] = 'application/json';
    if (store.getState().auth.token) {
      config.headers.Authorization = `Bearer ${store.getState().auth.token}`;
    }
  }
  return config;
}, handleError);

$apiClient.interceptors.response.use(response => response.data, handleError);

export default $apiClient;
