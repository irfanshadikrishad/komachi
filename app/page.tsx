import Board from "@/components/Board"
import Footer from "@/components/Footer"
import Latest from "@/components/Latest"
import Navbar from "@/components/Navbar"
import Schedule from "@/components/Schedule"
import TopAiring from "@/components/TopAiring"

export default function Home() {
  return (
    <>
      <Navbar />
      <Board />
      <Latest />
      {/* <Schedule /> */}
      <TopAiring />
      <Footer />
    </>
  )
}
