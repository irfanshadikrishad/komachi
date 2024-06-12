import { useContext, createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let SERVER = "https://komachi.onrender.com";
  const SKIP_SERVER = "https://api.aniskip.com";
  const defaultPoster = "./default_poster.jpg";
  const [skipTime, setSkipTime] = useState();
  const [automatics, setAutomatics] = useState({
    play: localStorage.getItem("play") ? localStorage.getItem("play") : false,
    skip: localStorage.getItem("skip") ? localStorage.getItem("skip") : false,
    next: localStorage.getItem("next") ? localStorage.getItem("next") : false,
  });
  let productionMode = true;

  // Comment before deploying
  SERVER = "http://localhost:3001";
  productionMode = false;

  function getRuntimeInMilliseconds() {
    return performance.now() / 1000;
  }

  return (
    <AuthContext.Provider
      value={{
        SERVER,
        getRuntimeInMilliseconds,
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
