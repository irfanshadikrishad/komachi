import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Image from "next/image"

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <Image
          width={300}
          height={250}
          draggable="false"
          src="/not_found.png"
          alt="e404"
        />
        <h1>404</h1>
        <p>Page not found.</p>
      </div>
      <Footer />
    </>
  )
}
