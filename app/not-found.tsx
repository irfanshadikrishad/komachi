import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="e404">
        <img width={300} draggable="false" src="/not_found.png" alt="e404" />
        <h1>404</h1>
        <p>Page not found.</p>
      </div>
      <Footer />
    </>
  );
}
