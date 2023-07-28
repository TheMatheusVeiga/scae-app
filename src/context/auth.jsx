import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import CryptoJS from "crypto-js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const encryptPass = (password) => {
    return CryptoJS.AES.encrypt("pass", password).toString();
  };

  const decryptPass = (password) => {
    const bytes = CryptoJS.AES.decrypt(password, "pass");
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  // Recover userLogged
  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
    }
    setLoading(false);
  }, []);

  //Login
  const login = async (email, password) => {
    setUser({ id: password, email });
    const loggedUser = {
      password: password,
      email: email,
    };

    localStorage.setItem("user", JSON.stringify(loggedUser));

    const userAuht = await isAuthenticated(loggedUser);
    if (userAuht.body.isUserAuthenticated.case == "TRUE") {
      navigate("/");
    } else {
      toast.error(userAuht.message);
    }
  };

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Get user on DB
  const isAuthenticated = async (loggedUser) => {
    const requestConfig = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(loggedUser),
    };

    const userAuthenticated = await fetch(
      process.env.REACT_APP_API_AUTHENTICATE_USER,
      requestConfig
    )
      .then((response) => response.json())
      .then((json) => {
        return json;
      })
      .catch((error) => console.log(error));

    debugger;
    const newLoggedUser = {
      password: encryptPass(JSON.parse(localStorage.getItem("user")).password),
      email: JSON.parse(localStorage.getItem("user")).email,
    };
    localStorage.removeItem("user");
    localStorage.setItem("user", JSON.stringify(newLoggedUser));

    return userAuthenticated;
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: !!user, user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
