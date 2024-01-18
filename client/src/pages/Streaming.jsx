import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth.jsx";
import ReactPlayer from 'react-player';
import { MdOutlineFileDownload } from "react-icons/md";
import { ImCloudDownload } from "react-icons/im";

export default function Streaming() {
    const { SERVER } = useAuth();
    const { animeId } = useParams();
    const [animeInfo, setAnimeInfo] = useState({});
    const [episodes, setEpisodes] = useState([]);
    const [streamLink, setStreamLink] = useState('');
    const [currentEpisode, setCurrentEpisode] = useState(1);
    const [episodeDownloadLink, setEpisodeDownloadLink] = useState('');

    const getStreamLink = async (episodeId) => {
        const request = await fetch(`${SERVER}/api/v1/anime/stream`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ episodeId })
            })
        const response = await request.json();
        if (request.status === 200) {
            setStreamLink(response.sources[response.sources.length - 1].url);
            setCurrentEpisode(episodeId);
            setEpisodeDownloadLink(response.download);
        } else { console.log(response); }
    }

    const getAnimeInfo = async () => {
        const request = await fetch(`${SERVER}/api/v1/anime/info`,
            {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ anilistId: animeId })
            });
        const response = await request.json();
        if (request.status === 200) {
            setAnimeInfo(response);
            setEpisodes(response.episodes);
            getStreamLink(response.episodes[0].id);
        } else {
            console.log(response);
        }
    }

    useEffect(() => { getAnimeInfo() }, [animeId])
    return (
        <section className="container streamingV2">
            {streamLink ? <section className="streamingV2_ReactPlayer">
                {streamLink && <div>
                    <div className="streamingV2_ReactPlayerHeader">
                        <p>Episode {String(currentEpisode).split('-')[String(currentEpisode).split('-').length - 1]}</p>
                        <a href={episodeDownloadLink} target="_blank">Download
                            <span className="streamingV2_DownloadIcon">
                                {<ImCloudDownload />}
                            </span>
                        </a>
                    </div>
                    <ReactPlayer
                        width="100%"
                        height="auto"
                        controls={true}
                        playing={true}
                        url={streamLink} />
                </div>}
                <div className="streamingV2Buttons">
                    {episodes.map((episode, index) => {
                        return <button onClick={() => { getStreamLink(episode.id) }} key={index} className="streamingV2Button">{episode.number}</button>
                    })}
                </div>
            </section> : <p>Loading...</p>}

            {animeInfo.id && <section className="streamingV2_Info">
                <div className="streamingV2_PosterContainer">
                    <img className="streamingV2_Poster" src={animeInfo.image} alt={animeInfo.id} draggable="false" />
                </div>
                <p>{animeInfo.title && animeInfo.title}</p>
                <p className="streamingV2_description">
                    {String(animeInfo.description).length > 250 ? String(animeInfo.description).slice(0, 250) + "..." : String(animeInfo.description)}
                </p>
                <p>Status : {animeInfo.status}</p>
                <p>Total Episodes : {animeInfo.totalEpisodes}</p>
                <p>Released: {animeInfo.releaseDate} {animeInfo.season}</p>
                <p>Type : {animeInfo.type}</p>
                {animeInfo.startDate && <p>Airing Date : {animeInfo.startDate.day}/{animeInfo.startDate.month}/{animeInfo.startDate.year} – {animeInfo.endDate.day}/{animeInfo.endDate.month}/{animeInfo.endDate.year} </p>}
                <div className="streamingV2AllSynonyms">
                    <p>Synonyms: </p>
                    <p>{animeInfo.otherName}</p>
                </div>
                <div className="streamingV2InfoGenres">
                    {animeInfo.genres && animeInfo.genres.map((genre, index) => {
                        return <span key={index}>{genre}</span>
                    })}
                </div>
            </section>}
        </section>
    )
}
