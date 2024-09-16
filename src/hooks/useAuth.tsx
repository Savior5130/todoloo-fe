import React, {
  createContext,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import {
  AuthContextType,
  CustomAxiosRequestConfig,
  loginBody,
  registerBody,
  User,
  UserResponse,
} from "../types/Types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  selectAccessToken,
  selectUser,
  setAccessToken,
  setUser,
} from "../redux/authSlice";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);
const AXIOS_BASE_URL = "http://localhost:3000/api/";
const GOOGLE_LOGIN_URL = "http://localhost:3000/api/auth/google/login";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const token = useAppSelector(selectAccessToken);

  const AxiosInstance = useMemo(
    () =>
      axios.create({
        baseURL: AXIOS_BASE_URL,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }),
    [token]
  );

  const register = ({ role, name, username, password }: registerBody) => {
    AxiosInstance.post("/auth/register", { role, username, name, password })
      .then(async () => {
        await login({ username, password });
      })
      .catch(() => toast.warning("Server error occured"));
  };

  const login = ({ username = "", password = "" }: loginBody): Promise<void> =>
    AxiosInstance.request({
      url: "/auth/login",
      method: "post",
      data: { username, password },
    })
      .then(({ data }: { data: UserResponse }) => {
        const { token, ...userInfo } = data;
        dispatch(setAccessToken(token));
        dispatch(setUser(userInfo));
        navigate("/home");
      })
      .catch(() => {
        toast.warning("Server error occured");
      });

  const googleLogin = () => (window.location.href = GOOGLE_LOGIN_URL);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    navigate("/login");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      dispatch(setAccessToken(token));
      if (!user) {
        AxiosInstance.get("/users/info").then(({ data }: { data: User }) => {
          setUser(data);
          dispatch(setUser(data));
          navigate("/home");
        });
      }
      toast.success("Login success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    const authInterceptor = axios.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        config.baseURL = AXIOS_BASE_URL;
        config.headers.Authorization =
          !config._retry && token
            ? `Bearer ${token}`
            : config.headers.Authorization;
        return config;
      }
    );
    return () => {
      axios.interceptors.request.eject(authInterceptor);
    };
  }, [token]);

  useLayoutEffect(() => {
    const refreshInterceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response.status === 401 &&
          error.response.data.message === "Unauthorized"
        ) {
          try {
            const response = await axios.get("/auth/refreshToken");
            setAccessToken(response.data.accessToken);
            originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
            originalRequest._retry = true;

            return axios(originalRequest);
          } catch {
            setAccessToken(null);
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(refreshInterceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ googleLogin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
