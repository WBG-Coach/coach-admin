import axios from "axios";
import StorageService from "./storage/storage.service";

const config = {
  baseURL: "http://localhost:3000/",
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  (config: any) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => error
);

_axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      StorageService.cleanStorage();
    }
    throw new Error(error);
  }
);

export default _axios;
