import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Latest() {
    const [latest, setLatest] = useState([]);

    const getLatest = async () => {
        const request = await fetch(`https://foxtream.up.railway.app/anime/gogoanime/recent-episodes`);
        const response = await request.json();
        if (request.status === 200) {
            setLatest(response.results)
        } else {
            console.log(response);
        }
    }

    useEffect(() => { getLatest() }, [])
    return <section className="container">
        <p className="partitionTitleII">Latest updates</p>
        <div className="latestContainer">
            {latest.map((late, index) => {
                return <NavLink to={`/streaming/${late.id}`} key={index} className="latestIndividual">
                    <img className="latestPoster" src={late.image} alt={late.id} draggable="false" />
                    <p className="latestTitle">{late.title}</p>
                    <p className="latestEpisodeNumber">EP {late.episodeNumber}</p>
                </NavLink>
            })}
        </div>
    </section>
}