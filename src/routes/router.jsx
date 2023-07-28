import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import App from "../pages/app/App";
import Login from "../pages/Login/Login";
import Dashboard from "../pages/Dashboard/Dashboard";
import { AuthContext, AuthProvider } from "../context/auth";
import GlobalStyles from "../style/globalStyles";
import { Backdrop, CircularProgress } from "@mui/material";

const AppRouter = () => {
  const Private = ({ children }) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      );
    }

    if (!authenticated) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route exact path="/" element={<Navigate to="/app" />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app">
              <Route
                path="/app"
                element={
                  <Private>
                    {" "}
                    <App />{" "}
                  </Private>
                }
              />
              <Route
                path="/app/dashboard"
                element={
                  <Private>
                    {" "}
                    <Dashboard />{" "}
                  </Private>
                }
              />
            </Route>
          </Routes>
          <GlobalStyles />
        </AuthProvider>
      </Router>
    </>
  );
};

export default AppRouter;
