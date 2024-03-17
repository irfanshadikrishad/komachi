import { useContext, createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let SERVER = "https://komachi.onrender.com";
  const [token, setToken] = useState(localStorage.getItem("logger"));
  const [user, setUser] = useState({});
  const isLoggedIn = Boolean(token);
  const defaultPoster = "./default_poster.jpg";
  let productionMode = true;

  // Comment before deploying
  // SERVER = "http://localhost:3001";
  // productionMode = false;

  function getRuntimeInMilliseconds() {
    return performance.now() / 1000;
  }

  const storeTokenInLS = async (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem("logger", serverToken);
  };

  const deleteTokenFromLS = () => {
    setToken("");
    return localStorage.removeItem("logger");
  };

  return (
    <AuthContext.Provider
      value={{
        SERVER,
        storeTokenInLS,
        token,
        isLoggedIn,
        user,
        deleteTokenFromLS,
        getRuntimeInMilliseconds,
        defaultPoster,
        productionMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
