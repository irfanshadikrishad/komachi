import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";
import Streaming from "./pages/Streaming";
import Search from "./pages/Search";
import E404 from "./pages/E404";
import { useAuth } from "./store/auth.jsx";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./layouts/Footer.jsx";

export default function App() {
  const { productionMode } = useAuth();

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
        <Route path="/search/:query" element={<Search />} />
        <Route path="*" element={<E404 />} />
      </Routes>
      <Footer />
      <Analytics />
    </BrowserRouter>
  );
}
