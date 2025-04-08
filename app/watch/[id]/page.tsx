import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import Watch from "@/components/Watch"

export const runtime = "edge"

export default function Streaming() {
  return (
    <>
      <Navbar />
      <Watch />
      <Footer />
    </>
  )
}
