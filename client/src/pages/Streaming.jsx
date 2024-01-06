import { useParams } from "react-router-dom"

export default function Streaming() {
    const { animeId } = useParams();

    return <section className="container">{animeId}</section>
}