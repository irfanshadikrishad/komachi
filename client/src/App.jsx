import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./layouts/Navbar";
import Streaming from "./pages/Streaming";
import Search from "./pages/Search";
import E404 from "./pages/E404";
import Login from "./pages/Login.jsx";
import SignUp from "./pages/SignUp.jsx";
import Profile from "./pages/Profile.jsx";
import { useAuth } from "./store/auth.jsx";

export default function App() {
  const { isLoggedIn } = useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/streaming/:animeId" element={<Streaming />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        <Route path="*" element={<E404 />} />
      </Routes>
    </BrowserRouter>
  );
}
