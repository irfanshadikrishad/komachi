import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function RecentEpisodes() {
    const [recent, setRecent] = useState({});
    const [page, setPage] = useState(1);
    const [type, setType] = useState(2);

    const getRecentEpisodes = async () => {
        const request = await fetch(`https://foxtream.up.railway.app/anime/gogoanime/recent-episodes?page=${page}&type=${type}`,
            {
                method: "GET",
            })
        const response = await request.json()
        if (request.status === 200) {
            setRecent(response);
        }
    }

    useEffect(() => {
        getRecentEpisodes();
    }, [])
    return <section className="recent container">
        <h1>Recent Episodes</h1>
        <section className="recent-episodes">
            {recent.results && recent.results.map((anime, index) => {
                return <NavLink to={`/stream/${anime.id}`} key={index} className="recentEpisodeIndividual">
                    <div className="recentPosterContainer">
                        <img src={anime.image} alt={anime.id} className="recentPoster" draggable="false" />
                        <p className="recentEpisode">EP {anime.episodeNumber}</p>
                    </div>
                    <div className="recentInfo">
                        <p className="recentTitle" >{anime.title}</p>
                    </div>
                </NavLink>
            })}
        </section>
    </section>
}