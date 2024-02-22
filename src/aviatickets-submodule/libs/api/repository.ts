import axios from "axios";
import { LocalStorageKeys } from "aviatickets-submodule/libs/enums/local-storage-keys.enum";

const { REACT_APP_API_URL } = process.env;

const repository = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  //withCredentials: true,
});

repository.interceptors.request.use((config) => {
  const access_token = localStorage.getItem(LocalStorageKeys.AccessToken);
  const reset_token = localStorage.getItem(LocalStorageKeys.ResetToken);
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  if (reset_token) {
    config.headers.Authorization = `Bearer ${reset_token}`;
  }

  return config;
});

repository.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem(LocalStorageKeys.RefreshToken);
      try {
        const token = await axios.get(
          `http://localhost:3001/api/v1/auth/refresh-tokens`,
          {
            headers: {
              Authorization: "Bearer " + refresh,
            },
          }
        );

        if (!token) {
          localStorage.removeItem(LocalStorageKeys.RefreshToken);
          return;
        }

        localStorage.setItem(
          LocalStorageKeys.AccessToken,
          token.data.accessToken
        );

        return repository(originalRequest);
      } catch (error) {
        localStorage.removeItem(LocalStorageKeys.AccessToken);
        localStorage.removeItem(LocalStorageKeys.RefreshToken);
        localStorage.removeItem(LocalStorageKeys.ResetToken);
        return Promise.reject(error);
      }
    }

    throw error;
  }
);

export default repository;
