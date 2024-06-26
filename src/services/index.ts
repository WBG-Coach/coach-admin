import axios, { AxiosError } from 'axios';
import StorageService from './storage/storage.service';

const config = {
  baseURL: import.meta.env.VITE_API_URL,
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log({ error });
    return error;
  },
);

_axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      StorageService.cleanStorage();
      location.reload();
    }

    throw error;
  },
);

export default _axios;
