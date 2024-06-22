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

  // Get Skip Time for Episodes
  const getSkipTime = async (episodeNumber, malId) => {
    try {
      const types = ["op", "ed"];
      const url = new URL(
        `${SKIP_SERVER}/v2/skip-times/${malId}/${episodeNumber}`
      );
      url.searchParams.append("episodeLength", 0);
      types.forEach((type) => url.searchParams.append("types", type));

      const request = await fetch(url.toString(), {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const response = await request.json();
      // console.log(response);
      if (response.statusCode === 200) {
        setSkipTime(response.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        SERVER,
        defaultPoster,
        productionMode,
        SKIP_SERVER,
        skipTime,
        getSkipTime,
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
