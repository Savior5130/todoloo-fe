import { createContext, ReactNode, useEffect } from "react";
import {
  AuthContextType,
  loginBody,
  registerBody,
  User,
  UserResponse,
} from "../types/Types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "./hooks";
import { selectUser, setAccessToken, setUser } from "../redux/authSlice";
import { api } from "../services";
import { GOOGLE_LOGIN_URL } from "../constants";

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const register = ({ role, name, username, password }: registerBody) => {
    api
      .post("/auth/register", { role, username, name, password })
      .then(async () => {
        await login({ username, password });
      })
      .catch(() => toast.warning("Server error occured during registration"));
  };

  const login = ({ username = "", password = "" }: loginBody): Promise<void> =>
    api
      .post("/auth/login", { username, password })
      .then(({ data }: { data: UserResponse }) => {
        const { token, ...userInfo } = data;
        dispatch(setAccessToken(token));
        dispatch(setUser(userInfo));
        navigate("/home");
      })
      .catch(() => {
        toast.error("Login failed. Please check your credentials.");
      });

  const googleLogin = () => (window.location.href = GOOGLE_LOGIN_URL);

  const logout = () => {
    api
      .request({
        url: "/auth/logout",
        method: "post",
      })
      .then(() => {
        dispatch(setUser(null));
        dispatch(setAccessToken(null));
        navigate("/login");
      })
      .catch(() => {
        toast.error("Logout failed. Please try again.");
      });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      dispatch(setAccessToken(token));
      if (!user) {
        api.get("/users/info").then(({ data }: { data: User }) => {
          dispatch(setUser(data));
          navigate("/home");
        });
      }
      toast.success("Login success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ googleLogin, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
