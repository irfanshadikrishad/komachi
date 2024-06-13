import { useContext, createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [skipTime, setSkipTime] = useState();
  const [automatics, setAutomatics] = useState({
    play: localStorage.getItem("play") ? localStorage.getItem("play") : false,
    skip: localStorage.getItem("skip") ? localStorage.getItem("skip") : false,
    next: localStorage.getItem("next") ? localStorage.getItem("next") : false,
  });
  const defaultPoster = "./default_poster.jpg";
  const productionMode = import.meta.env.PROD;
  const SERVER = import.meta.env.VITE_BASE_SERVER_URL;
  const SKIP_SERVER = import.meta.env.VITE_SKIP_SERVER_URL;

  return (
    <AuthContext.Provider
      value={{
        SERVER,
        defaultPoster,
        productionMode,
        SKIP_SERVER,
        skipTime,
        setSkipTime,
        automatics,
        setAutomatics,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
