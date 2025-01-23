import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamFtZXMiLCJ1c2VySWQiOiI2NzkxMmNlZWM2OTc5NTQzYWM3ZDYyOTkiLCJpYXQiOjE3Mzc1Njc1NzIsImV4cCI6MTc0MDE1OTU3Mn0.AZNYY3sxhPvuBBOATIIVL4HkWk4h74dLnb7h3GVi7xI"
  );
  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
