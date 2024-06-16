import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useRef } from "react";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";
import Streaming from "./pages/Streaming";
import Search from "./pages/Search";
import E404 from "./pages/E404";
import { useAuth } from "./store/auth.jsx";
import { Analytics } from "@vercel/analytics/react";
import Footer from "./layouts/Footer.jsx";

export default function App() {
  const { productionMode } = useAuth();
  const prevDimensions = useRef({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      const { innerWidth: currentWidth, innerHeight: currentHeight } = window;

      if (
        (currentWidth !== prevDimensions.current.width ||
          currentHeight !== prevDimensions.current.height) &&
        productionMode
      ) {
        debugger;
      }

      prevDimensions.current = { width: currentWidth, height: currentHeight };
    };

    const debouncedResize = debounce(handleResize, 1000);

    window.addEventListener("resize", debouncedResize);

    // Prevent From Developer Tool Shortcuts
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && e.key === "I" && productionMode) ||
        (e.metaKey && e.altKey && e.key === "I" && productionMode)
      ) {
        e.preventDefault();
        debugger;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    // Prevent User from Right Click
    const handleContextMenu = (event) => {
      if (productionMode) {
        event.preventDefault();
      }
    };

    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      window.removeEventListener("resize", debouncedResize);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [productionMode]);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streaming/:animeId" element={<Streaming />} />
        <Route path="/search" element={<Search />} />
        <Route path="*" element={<E404 />} />
      </Routes>
      <Footer />
      <Analytics />
    </BrowserRouter>
  );
}

// Debounce function to limit the rate at which a function can fire
function debounce(fn, delay) {
  let timeoutId;
  return function (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
}
