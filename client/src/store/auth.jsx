import { useContext, createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const API = "https://foxtream.up.railway.app";

  return (
    <AuthContext.Provider value={{ API }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
