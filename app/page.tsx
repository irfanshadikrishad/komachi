import Board from "@/components/Board"
import Footer from "@/components/Footer"
import Latest from "@/components/Latest"
import Navbar from "@/components/Navbar"
import TopAiring from "@/components/TopAiring"

export const runtime = "edge"

export default function Home() {
  return (
    <>
      <Navbar />
      <Board />
      <Latest />
      <TopAiring />
      <Footer />
    </>
  )
}
