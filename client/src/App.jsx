import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";
import Streaming from "./pages/Streaming";
import Search from "./pages/Search";
import E404 from "./pages/E404";
import { AuthProvider } from './store/auth.jsx';

export default function App() {
  return <AuthProvider>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streaming/:animeId" element={<Streaming />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="*" element={<E404 />} />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
}