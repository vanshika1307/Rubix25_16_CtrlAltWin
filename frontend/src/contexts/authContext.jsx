import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [name, setName] = useState(localStorage.getItem("username"));
  console.log(token);
  return <AuthContext.Provider value={{ token, setToken, name, setName }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
