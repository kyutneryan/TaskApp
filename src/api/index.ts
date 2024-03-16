import axios, { AxiosError } from 'axios';
import { logOut, store } from '../store';

const $apiClient = axios.create({
  baseURL: 'https://dummyjson.com',
  withCredentials: true,
});

const handleError = (error: Error | AxiosError) => {
  //   const { toast } = createStandaloneToast({
  //     defaultOptions: { status: 'error', ...toastDefaultOptions },
  //   });
  if (axios.isAxiosError(error) && !!error.response?.data?.message) {
    if (error.response.status === 401) {
      store.dispatch(logOut());
    }
    // toast({ title: error.response.data.message });
    return Promise.reject(error.response.data);
  } else {
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
