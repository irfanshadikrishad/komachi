import { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import TopAiringCard from "./TopAiringCard";
import { useAuth } from '../store/auth.jsx';
import Loader from "./Loader.jsx";

const responsive = {
    superLargeDesktop: {
        breakpoint: { max: 4000, min: 3000 },
        items: 8
    },
    desktop: {
        breakpoint: { max: 1920, min: 1024 },
        items: 8
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 6
    },
    mobileRoatate: {
        breakpoint: { max: 768, min: 0 },
        items: 4
    },
    mobile: {
        breakpoint: { max: 600, min: 0 },
        items: 3
    },
    smallMobile: {
        breakpoint: { max: 375, min: 0 },
        items: 2
    }
};

export default function TopAiring() {
    const { SERVER } = useAuth();
    const [top, setTop] = useState([]);

    const getTopAiring = async () => {
        const request = await fetch(`${SERVER}/api/v1/anime/trending`);
        const response = await request.json();
        if (request.status === 200) { setTop(response) } else { console.log(response); }
    }

    useEffect(() => {
        getTopAiring();
    }, [])
    return (
        <section className="container">
            {top.length > 0 ? <>
                <p className="partitionTitle" >Top Airing</p>
                <Carousel
                    autoPlay={true}
                    swipeable={true}
                    draggable={true}
                    showDots={false}
                    rewind={true}
                    partialVisbiles="false"
                    responsive={responsive}>
                    {top.length > 0 && top.map((to, i) => {
                        const { id, image, title } = to;
                        return <TopAiringCard
                            key={id}
                            id={id}
                            title={title}
                            image={image}
                            index={i} />
                    })}
                </Carousel>
            </> : <Loader />}
        </section >
    )
}
