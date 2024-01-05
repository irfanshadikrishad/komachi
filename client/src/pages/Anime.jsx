import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player"

export default function Anime() {
    const { animeId } = useParams();
    const [anime, setAnime] = useState({});
    const [streamline, setStreamline] = useState('');

    const getAnimeInfo = async () => {
        const request = await fetch(`https://foxtream.up.railway.app/anime/gogoanime/info/${animeId}`, { method: "GET" });
        const response = await request.json();
        if (request.status === 200) {
            await setAnime(response);
            getEpisodeStreamingURL(response.id);
        } else {
            console.log(response);
        }
    }

    const getEpisodeStreamingURL = async (episodeId) => {
        const request = await fetch(`https://foxtream.up.railway.app/anime/gogoanime/watch/${episodeId + "-episode-1"}`);
        const response = await request.json();
        if (request.status === 200) {
            await setStreamline(response);
            console.log(streamline.sources && streamline.sources[4].url);
        } else {
            console.log(response);
        }
    }

    useEffect(() => {
        getAnimeInfo();
    }, [setAnime])
    return <>
        <section className="container streaming">
            <section className="streamingMain">
                {streamline ? <ReactPlayer
                    width="100%"
                    height="auto"
                    playing={true}
                    controls={true}
                    url={streamline.sources[4].url}
                /> : ""}
            </section>
            <section className="streamingInfo">
                <img className="streamingImage" src={anime.image} alt={anime.id} draggable="false" />
                <p className="streamingTitle">{anime.title}</p>
                <p className="streamingDescription">
                    {anime.description && anime.description.slice(0, 200)}{anime.description && anime.description.length > 200 && "..."}
                </p>
                <div className="streamingDescriptionPart2">
                    <div className="streamingScram">
                        <p>Type</p>
                        <p>{anime.type}</p>
                    </div>
                    <div className="streamingScram">
                        <p>Released</p>
                        <p>{anime.releaseDate}</p>
                    </div>
                    <div className="streamingScram">
                        <p>Status</p>
                        <p>{anime.status}</p>
                    </div>
                    <div className="streamingScram">
                        <p>Episodes</p>
                        <p>{anime.totalEpisodes}</p>
                    </div>
                </div>
                <div className="streamingGenres">
                    {anime.genres && anime.genres.map((gen, i) => {
                        return <p key={i}>{gen}</p>
                    })}
                </div>
            </section>
        </section>
    </>
}