import { ChakraProvider, Text } from "@chakra-ui/react";
import { lightTheme } from "./styles/themes/light";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContextProvider from "./contexts/UserContext";
import ReactDOM from "react-dom/client";
import { Router } from "./routes";
import "./styles/index.css";
import React from "react";
import "./i18n";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={lightTheme}>
      <BrowserRouter basename="/sl/admin">
        <UserContextProvider>
          <ToastContainer
            position="top-center"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Router />
        </UserContextProvider>
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);
