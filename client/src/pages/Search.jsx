import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { useAuth } from '../store/auth.jsx';

export default function Search() {
    const { API, SERVER } = useAuth();
    const { query } = useParams();
    const [searched, setSearched] = useState([]);

    const getSearched = async () => {
        // const request = await fetch(`${API}/anime/gogoanime/${query}`);
        // const response = await request.json();
        // if (request.status === 200) {
        //     setSearched(response.results);
        // } else {
        //     console.log(response);
        // }
        const request = await fetch(`${SERVER}/api/v1/anime/search`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ searchQuery: query })
            })
        const response = await request.json();
        if (request.status === 200) {
            setSearched(response.results);
        } else {
            console.log(response);
        }
    }

    useEffect(() => { getSearched() }, [query])
    return <section className="container">
        <p>{searched.length > 0 ? `search results for '${query}'` : `no search results for '${query}'`}</p>
        <div className="searchContainerMain">
            {searched && searched.map((sea, index) => {
                const { image, title, id } = sea;
                return <NavLink to={`/streaming/${id}`} key={index}
                    className="searchIndividual">
                    <img
                        src={image}
                        alt={id}
                        className="searchPoster"
                        draggable="false" />
                    <p>{title.userPreferred}</p>
                </NavLink>
            })}
        </div>
    </section>
}