import React, { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextType, loginBody, registerBody, User } from "../types/Types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AxiosInstance } from "../api";

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();
  const setToken = useState<string | null>(null)[1];
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const local_user = localStorage.getItem("user");
    const local_token = localStorage.getItem("access_token");
    if (local_user && local_token) {
      setUser(JSON.parse(local_user));
      setToken(local_token);
    }
    setIsAuthenticated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const register = ({ role, name, username, password }: registerBody) => {
    AxiosInstance.post("/users/register", { role, username, name, password })
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
      .then(({ data }) => {
        const { token, ...userInfo } = data;
        localStorage.setItem("access_token", token);
        localStorage.setItem("user", JSON.stringify(userInfo));
        setUser(userInfo);
        navigate("/home");
      })
      .catch(() => {
        setIsAuthenticated(false);
        toast.warning("Server error occured");
      });

  const googleLogin = () =>
    (window.location.href = "http://localhost:3000/api/auth/google/login");

  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("user");
    setUser(undefined);
    setToken("");
    setIsAuthenticated(false);
    navigate("/login");
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("access_token", token);
      if (!user) {
        AxiosInstance.get("/users/info").then(({ data }) => {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
          navigate("/home");
        });
      }
      toast.success("Login success");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, googleLogin, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
