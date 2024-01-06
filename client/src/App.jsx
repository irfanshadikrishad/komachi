import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";
import Streaming from "./pages/Streaming";

export default function App() {
  return <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/streaming/:animeId" element={<Streaming />} />
    </Routes>
  </BrowserRouter>
}