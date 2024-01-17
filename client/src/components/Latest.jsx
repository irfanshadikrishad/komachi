import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from '../store/auth.jsx';
import { InfinitySpin } from 'react-loader-spinner';

export default function Latest() {
    const { SERVER } = useAuth();
    const [latest, setLatest] = useState([]);
    const [loading, setLoading] = useState(true);
    // const [type, setType] = useState(1);

    const getLatest = async () => {
        const request = await fetch(`${SERVER}/api/v1/anime/recent`);
        const response = await request.json();

        if (request.status === 200) {
            setLatest(response.results);
            setLoading(false);
        } else {
            console.log(response);
        }
    }

    useEffect(() => { getLatest() }, [])
    return <section className="container">
        <div className="latest_Header">
            <p className="partitionTitleII">Latest updates</p>
            {/* <div className="latest_buttons" >
                <button style={{ backgroundColor: type === 1 && 'var(--background)' }}
                    className="latest_button"
                    onClick={() => { setType(1) }}>jp</button>
                <button style={{ backgroundColor: type === 2 && 'var(--background)' }}
                    className="latest_button"
                    onClick={() => { setType(2) }}>en</button>
                <button style={{ backgroundColor: type === 3 && 'var(--background)' }}
                    className="latest_button"
                    onClick={() => { setType(3) }}>ch</button>
            </div> */}
        </div>
        {loading ? <InfinitySpin
            visible={true}
            width="100"
            color="#ff5705"
            ariaLabel="infinity-spin-loading"
        /> : <div className="latestContainer">
            {latest.map((late, index) => {
                const { id, image, title, episodeNumber } = late;
                return <NavLink
                    to={`/streaming/${id}`}
                    key={index}
                    className="latestIndividual">
                    <img className="latestPoster" src={image} alt={id} draggable="false" />
                    <p className="latestTitle">{title.english}</p>
                    <p className="latestEpisodeNumber">EP {episodeNumber}</p>
                </NavLink>
            })}
        </div>}

    </section>
}
