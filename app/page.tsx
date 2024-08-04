import Board from "@/components/Board";
import Latest from "@/components/Latest";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Board />
      <Latest />
      <Footer />
    </>
  );
}
