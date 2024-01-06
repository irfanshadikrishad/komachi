import { useEffect, useState } from "react";
import styled from 'styled-components';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { NavLink } from "react-router-dom";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 8
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 8
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 2
    }
};

export default function TopAiring() {
    const [top, setTop] = useState([]);

    const getTopAiring = async () => {
        const request = await fetch(`https://foxtream.up.railway.app/anime/gogoanime/top-airing`);
        const response = await request.json();
        if (request.status === 200) { setTop(response.results) } else { console.log(response); }
    }

    useEffect(() => {
        getTopAiring();
    }, [])
    return <section className="container">
        <p className="partitionTitle">Top Airing</p>
        <Carousel
            autoPlay={true}
            swipeable={true}
            draggable={true}
            showDots={false}
            rewind={true}
            partialVisbiles="false"
            responsive={responsive}>
            {top.length > 0 && top.map((t, i) => {
                return <NavLink to={`/streaming/${t.id}`} key={i} className="topAiringCard">
                    <img
                        className="topAiringPoster"
                        src={t.image}
                        alt={t.title} />
                    <p className="topAiringTitle">{t.title}</p>
                    <p className="topRanking">TOP {i + 1}</p>
                </NavLink>
            })}
        </Carousel>
    </section>
}