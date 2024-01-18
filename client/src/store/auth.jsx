import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const SERVER = "https://foxtream.onrender.com";
  const [token, setToken] = useState(localStorage.getItem('logger'));
  const [user, setUser] = useState({});
  const isLoggedIn = Boolean(token);

  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    return localStorage.setItem('logger', serverToken);
  }

  const autheticate = async () => {
    const request = await fetch(`${SERVER}/api/v1/user`,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      })
    const response = await request.json();
    if (request.status === 200) {
      setUser(response.user);
    }
  }

  useEffect(() => {
    autheticate();
  }, []);
  return (
    <AuthContext.Provider value={{ SERVER, storeTokenInLS, token, isLoggedIn, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
