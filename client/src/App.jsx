import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";
import Streaming from "./pages/Streaming";
import Search from "./pages/Search";
import E404 from "./pages/E404";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import Native from "./pages/Native.jsx";
import { useAuth } from "./store/auth.jsx";
import { useEffect } from "react";

export default function App() {
  const { isLoggedIn, productionMode } = useAuth();

  useEffect(() => {
    // If Height Weight Changes Pause Debugger
    let prevWidth = window.innerWidth;
    let prevHeight = window.innerHeight;

    setInterval(function () {
      const currentWidth = window.innerWidth;
      const currentHeight = window.innerHeight;

      if (
        (currentWidth !== prevWidth || currentHeight !== prevHeight) &&
        productionMode
      ) {
        debugger;
      }

      prevWidth = currentWidth;
      prevHeight = currentHeight;
    }, 1000);

    // Prevent From Developer Tool Shortcuts
    document.onkeydown = function (e) {
      if (
        (e.ctrlKey && e.shiftKey && e.key === "I" && productionMode) ||
        (e.metaKey && e.altKey && e.key === "I" && productionMode)
      ) {
        e.preventDefault();
        debugger;
      }
    };

    // Prevent User from Right Click
    document.addEventListener("contextmenu", function (event) {
      if (productionMode) {
        event.preventDefault();
      }
    });
  });
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streaming/:animeId" element={<Streaming />} />
        <Route path="/native/:animeId" element={<Native />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        <Route path="*" element={<E404 />} />
      </Routes>
    </BrowserRouter>
  );
}
