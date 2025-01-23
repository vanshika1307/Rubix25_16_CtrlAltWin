import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamFjayIsInVzZXJJZCI6IjY3OTIwN2IxZGFiMWQ0NTRiNDM5Mjk3MiIsImlhdCI6MTczNzYyMzQ3MywiZXhwIjoxNzQwMjE1NDczfQ.40-T_r4HeNgIX88_q02N4M0hvIi_0OfNF2dnoQLERi8"
  );
  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
