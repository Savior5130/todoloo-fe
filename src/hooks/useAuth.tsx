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
        await login({ type: "local", username, password });
      })
      .catch(() => toast.warning("Server error occured"));
  };

  const login = ({ type, username, password }: loginBody): Promise<void> =>
    AxiosInstance.request({
      url: type === "local" ? "/auth/login" : "/auth/google/login",
      method: type === "local" ? "post" : "get",
      data: type === "local" && { username, password },
    })
      .then(
        ({ data }) => (
          setIsAuthenticated(true),
          localStorage.setItem("access_token", data.access_token),
          AxiosInstance.get("/users", { params: { username } }).then(
            ({ data }) => {
              setUser(() => data[0]);
              toast.success("Login success");
              navigate("/home");
            }
          )
        )
      )
      .catch(() => {
        setIsAuthenticated(false);
        toast.warning("Server error occured");
      });

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(undefined);
    setToken("");
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, register }}
    >
      {isAuthenticated ? children : null}
    </AuthContext.Provider>
  );
};

export const useAuth = () => React.useContext(AuthContext);
