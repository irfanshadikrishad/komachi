import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from '../store/auth.jsx';

export default function Latest() {
    const { API } = useAuth();
    const [latest, setLatest] = useState([]);
    const [type, setType] = useState(1);

    const getLatest = async () => {
        const request = await fetch(`${API}/anime/gogoanime/recent-episodes?type=${type}`);
        const response = await request.json();
        if (request.status === 200) {
            setLatest(response.results)
        } else {
            console.log(response);
        }
    }

    useEffect(() => { getLatest() }, [type])
    return <section className="container">
        <div className="latest_Header">
            <p className="partitionTitleII">Latest updates</p>
            <div className="latest_buttons" >
                <button style={{ backgroundColor: type === 1 && 'var(--background)' }}
                    className="latest_button"
                    onClick={() => { setType(1) }}>jp</button>
                <button style={{ backgroundColor: type === 2 && 'var(--background)' }}
                    className="latest_button"
                    onClick={() => { setType(2) }}>en</button>
                <button style={{ backgroundColor: type === 3 && 'var(--background)' }}
                    className="latest_button"
                    onClick={() => { setType(3) }}>ch</button>
            </div>
        </div>
        <div className="latestContainer">
            {latest.map((late, index) => {
                return <NavLink
                    to={`/streaming/${late.id}`}
                    key={index}
                    className="latestIndividual">
                    <img className="latestPoster" src={late.image} alt={late.id} draggable="false" />
                    <p className="latestTitle">{late.title}</p>
                    <p className="latestEpisodeNumber">EP {late.episodeNumber}</p>
                </NavLink>
            })}
        </div>
    </section>
}