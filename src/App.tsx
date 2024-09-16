import { persistStore } from "redux-persist";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";
import { PersistGate } from "redux-persist/integration/react";
import "react-toastify/ReactToastify.minimal.css";
import "./App.css";
import { HomeScreen, LoginScreen, RegisterScreen } from "./screens";
import store from "./redux/store";
import { lightTheme } from "./styles/theme";
import { AuthProvider } from "./hooks/useAuth";

const App = () => {
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      {/* <PersistGate persistor={persistor}> */}
      <ThemeProvider theme={lightTheme}>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="*" element={<LoginScreen />} />
              <Route path="/login" element={<LoginScreen />} />
              <Route path="/register" element={<RegisterScreen />} />
              <Route path="/home" element={<HomeScreen />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
      {/* </PersistGate> */}
    </Provider>
  );
};

export default App;
