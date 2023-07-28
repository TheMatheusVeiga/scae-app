import React, {useState} from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Theme from "./style/theme";
import GlobalStyles from "./style/globalStyles";
import { Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Login from "./pages/Login/Login";
import App from "./pages/app/App";
import { AuthContext } from "./context/auth";
import AppRouter from './routes/router';

import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ThemeProvider theme={Theme}>
      <AppRouter />
    </ThemeProvider>
    <Toaster toastOptions={{
      style: {
        fontFamily: 'Verdana'
      },
    }} />
  </>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
