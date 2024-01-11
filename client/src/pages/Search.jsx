import { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";

export default function Search() {
    const { query } = useParams();
    const [searched, setSearched] = useState([]);

    const getSearched = async () => {
        const request = await fetch(`https://foxtream.up.railway.app/anime/gogoanime/${query}`);
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
                return <NavLink to={`/streaming/${sea.id}`} key={index}
                    className="searchIndividual">
                    <img
                        src={sea.image}
                        alt={sea.id}
                        className="searchPoster"
                        draggable="false" />
                    <p>{sea.title}</p>
                </NavLink>
            })}
        </div>
    </section>
}