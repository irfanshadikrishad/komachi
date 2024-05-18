import { useContext, createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let SERVER = "https://komachi.onrender.com";
  const defaultPoster = "./default_poster.jpg";
  let productionMode = true;
  const [fullPageLoader, setFullPageLoader] = useState(true);

  // Comment before deploying
  // SERVER = "http://localhost:3001";
  // productionMode = false;

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
        fullPageLoader,
        setFullPageLoader,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
