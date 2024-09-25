import axios from "axios";
import { setAccessToken, setUser } from "../redux/authSlice";
import store from "../redux/store";
import { toast } from "react-toastify";
import { AXIOS_BASE_URL } from "../constants";

const { dispatch } = store;

const api = axios.create({
  baseURL: AXIOS_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401) {
      await api
        .post("/auth/refresh", {
          withCredentials: true,
        })
        .then((response) => {
          if (response.status === 200) {
            const { accessToken } = response.data;
            dispatch(setAccessToken(accessToken));
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return axios(originalRequest);
          }
        })
        .catch((err) => {
          dispatch(setAccessToken(null));
          dispatch(setUser(null));
          window.location.replace("/login");
          toast.error("Session expired. Please log in again.");
          return Promise.reject(err);
        });
    }
  }
);

export default api;
