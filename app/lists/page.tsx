import ListsComponent from "@/components/ListsComponent"
import { Suspense } from "react"

export const runtime = "edge"

export default function Lists() {
  return (
    <Suspense>
      <ListsComponent />
    </Suspense>
  )
}
