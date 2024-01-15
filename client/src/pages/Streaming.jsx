import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';
import Loading from "../components/Loading";
import { LuDownload } from "react-icons/lu";
import { useAuth } from '../store/auth.jsx';

export default function Streaming() {
    const { API } = useAuth();
    const { animeId } = useParams();
    const [animeInfo, setAnimeInfo] = useState({});
    const [genres, setGenres] = useState([]);
    const [episodeId, setEpisodeId] = useState(animeId + '-episode-1');
    const [episodeUrl, setEpisodeUrl] = useState('');
    const [episodes, setEpisodes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [downloadLink, setDownloadLink] = useState('');

    const rebumpEpisode = async () => {
        const request = await fetch(`${API}/anime/gogoanime/info/${animeId}`)
        const response = await request.json();
        if (request.status === 200) {
            setEpisodeId(response.episodes[0].id);
            getEpisode(response.episodes[0].id);
        }
    }

    const getEpisode = async (episodeId) => {
        try {
            const request = await fetch(`${API}/anime/gogoanime/watch/${episodeId}`);
            const response = await request.json();
            if (request.status === 200) {
                setLoading(false);
                if (response.sources.length <= 4) {
                    setEpisodeUrl(response.sources[1].url);
                } else {
                    setEpisodeUrl(response.sources[4].url);
                }
                setDownloadLink(response.download);
            } else {
                rebumpEpisode();
            }
        } catch (error) {
            setLoading(true);
            console.log(error.message);
        }
    }

    const getAnimeInfo = async () => {
        const request = await fetch(`${API}/anime/gogoanime/info/${animeId}`);
        const response = await request.json();
        if (request.status === 200) {
            setAnimeInfo(response);
            setGenres(response.genres);
            setEpisodeId(response.episodes[0].id);
            setEpisodes(response.episodes);
            getEpisode(episodeId);
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        getAnimeInfo();
    }, [animeId])
    return (
        <>
            {loading && animeInfo.status !== "Not yet aired" ? <Loading /> : <section className="container streaming">
                <div className="streamingPlayer">
                    {episodeUrl && <div>
                        <div className="streaming_Seperator">
                            <p className="streamingPlayerEpisodeNumber">
                                {`${String(episodeId).split('-').slice(-2)[0]} ${String(episodeId).split('-').slice(-2)[1]}`}
                            </p>
                            <a className="streaminDownloadLink" href={downloadLink} target="_blank">
                                {<LuDownload />}
                            </a>
                        </div>
                        {episodeUrl && <ReactPlayer
                            width="100%"
                            height="auto"
                            controls={true}
                            playing={true}
                            url={episodeUrl} />}
                        <div className="streamingPlayerButtons">
                            {episodes.map((epis) => {
                                return <button
                                    onClick={() => { getEpisode(epis.id); setEpisodeId(epis.id) }}
                                    className="streamingPlayerButton"
                                    key={epis.number}>{epis.number}
                                </button>
                            })}
                        </div>
                    </div>}
                </div>
                <div className="streamingInfo">
                    {animeInfo && <div>
                        <div className="imageStreaming">
                            <div className="streaminImageContainer">
                                {animeInfo.image && <img src={animeInfo.image}
                                    alt={animeId}
                                    className="streamingInfoPoster"
                                    draggable="false" />}
                            </div>
                            <div>
                                <p>{animeInfo.title}</p>
                                <p className="streamingInfoDescription">
                                    {String(animeInfo.description).length > 250 ? animeInfo.description.slice(0, 250) + "..." : animeInfo.description}
                                </p>
                            </div>
                        </div>
                        <div className="streamingInfoDeepAll">
                            <div className="streamingInfoDeep">
                                <p>Status</p>
                                <p>{animeInfo.status}</p>
                            </div>
                            <div className="streamingInfoDeep">
                                <p>Type</p>
                                <p>{animeInfo.type}</p>
                            </div>
                            <div className="streamingInfoDeep">
                                <p>Episodes</p>
                                <p>{animeInfo.totalEpisodes}</p>
                            </div>
                            <div className="streamingInfoDeep">
                                <p>Released</p>
                                <p>{animeInfo.releaseDate}</p>
                            </div>
                            <div className="streamingInfoDeep">
                                <p>Other Names</p>
                                <p>{animeInfo.otherName}</p>
                            </div>
                        </div>
                        <div className="streamingGenres">
                            {genres && genres.map((genre, i) => {
                                return <p key={i} className="streamingGenre">{genre}</p>
                            })}
                        </div>
                    </div>}
                </div>
            </section>}
        </>
    )
}