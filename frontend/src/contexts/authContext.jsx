import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiamFjayIsInVzZXJJZCI6IjY3OTExM2ZjZTgyMjczMjhjY2I0MjM0MyIsImlhdCI6MTczNzU2MTA5MSwiZXhwIjoxNzQwMTUzMDkxfQ.pGBRtS5jGMyEtMYTDCDNYpiRGi-wL-VIem7-uZj_uno"
  );
  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
