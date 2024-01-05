import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Anime from "./pages/Anime";
import Navbar from "./layouts/Navbar";

export default function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/stream/:animeId" element={<Anime />} />
    </Routes>
  </BrowserRouter>
}