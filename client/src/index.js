import React from "react";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { store } from "./store";
import "./index.css";
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { createTheme } from "@mui/material";
import { ToastContainer } from "react-toastify";
import { openDb } from "./services/IndexedDbService";
import { registerSync } from "./services/ContactService";

openDb()
  .then(() => {
    const root = ReactDOM.createRoot(document.getElementById("root"));
    const theme = createTheme();

    root.render(
      <React.StrictMode>
        <Provider store={store}>
          <ThemeProvider theme={theme}>
            <App />
            <ToastContainer />
          </ThemeProvider>
        </Provider>
      </React.StrictMode>
    );
  })
  .catch((error) => {
    console.error("Error opening IndexedDB:", error);
  });

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
