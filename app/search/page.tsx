import SearchComponent from "@/components/SearchComponent"
import { Suspense } from "react"

export const runtime = "edge"

export default function Search() {
  return (
    <Suspense>
      <SearchComponent />
    </Suspense>
  )
}
