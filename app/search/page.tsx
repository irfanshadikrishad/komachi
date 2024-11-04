import SearchComponent from "@/components/SearchComponent"
import { Suspense } from "react"

export default function Search() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SearchComponent />
    </Suspense>
  )
}
