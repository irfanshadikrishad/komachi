import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from 'react-player';

export default function Streaming() {
    const { animeId } = useParams();
    const [animeInfo, setAnimeInfo] = useState({});
    const [genres, setGenres] = useState([]);
    const [episodeId, setEpisodeId] = useState(animeId + '-episode-1');
    const [episodeUrl, setEpisodeUrl] = useState('');
    const [episodes, setEpisodes] = useState([]);

    const getEpisode = async (episodeId) => {
        try {
            const request = await fetch(`https://foxtream.up.railway.app/anime/gogoanime/watch/${episodeId}`);
            const response = await request.json();
            if (request.status === 200) {
                if (response.sources.length <= 4) {
                    setEpisodeUrl(response.sources[1].url);
                } else {
                    setEpisodeUrl(response.sources[4].url);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const getAnimeInfo = async () => {
        const request = await fetch(`https://foxtream.up.railway.app/anime/gogoanime/info/${animeId}`);
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
    }, [animeId, episodeId])
    return (
        <section className="container streaming">
            <div className="streamingPlayer">
                {episodeUrl && <div>
                    <div className="streamingPlayerEpisodeNumber">
                        {`${String(episodeId).split('-').slice(-2)[0]} ${String(episodeId).split('-').slice(-2)[1]}`}</div>
                    {episodeUrl ? <ReactPlayer
                        width="100%"
                        height="auto"
                        controls={true}
                        playing={true}
                        url={episodeUrl} /> : <p>Loading...</p>}
                    <div className="streamingPlayerButtons">
                        {episodes.map((epis, i) => {
                            return <button
                                onClick={() => { getEpisode(epis.id); setEpisodeId(epis.id) }}
                                className="streamingPlayerButton"
                                key={i}>{i + 1}
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
        </section>
    )
}