import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="e404">
        <h1>Who&#39;s there!?</h1>
        <img width={200} draggable="false" src="/angry_chan.png" alt="e404" />
        <h1>Look where you are going.</h1>
        <h1>Nothing&#39;s here. Go back.</h1>
      </div>
      <Footer />
    </>
  );
}
