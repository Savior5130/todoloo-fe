import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { lightTheme } from "./styles/theme";
import { HomeScreen, LoginScreen, RegisterScreen } from "./screens";
import { AuthContext } from "./context/AuthContext";
import { useState } from "react";
import { loginBody, User } from "./types";
import { AxiosInstance } from "./api";

const App = () => {
  const [user, setUser] = useState<User | undefined>();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async ({
    type,
    username,
    password,
  }: loginBody): Promise<void> =>
    AxiosInstance.request({
      url: type === "local" ? "/auth/login" : "/auth/google/login",
      method: type === "local" ? "post" : "get",
      data: type === "local" && { username, password },
    })
      .then(
        ({ data }) => (
          setUser(data),
          setIsAuthenticated(true),
          localStorage.setItem("access_token", data.access_token),
          AxiosInstance.get("/users", { params: { username } }).then(
            ({ data }) => setUser(data)
          ),
          window.location.replace("/home")
        )
      )
      .catch(() => setIsAuthenticated(false));

  const logout = () => {
    setUser(undefined);
    setIsAuthenticated(false);
  };

  return (
    <ThemeProvider theme={lightTheme}>
      <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
        <BrowserRouter>
          <Routes>
            <Route path="*" element={<LoginScreen />} />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/home" element={<HomeScreen />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </ThemeProvider>
  );
};

export default App;
