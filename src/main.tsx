import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Slide, ToastContainer } from "react-toastify";
import App from "./App.tsx";
import "./index.css";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <ToastContainer
      position="bottom-right"
      autoClose={2000}
      closeButton={false}
      hideProgressBar={false}
      newestOnTop={false}
      rtl={false}
      pauseOnFocusLoss
      transition={Slide}
      draggable
      pauseOnHover
      theme="colored"
      style={{ maxWidth: "40rem" }}
    />
  </StrictMode>
);
