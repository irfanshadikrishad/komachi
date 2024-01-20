import { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx";
import { NavLink } from "react-router-dom";

export default function Profile() {
    const { user, SERVER } = useAuth();
    // const [watchingInfos, setWatchingInfos] = useState([]);

    // const getList = async () => {
    //     if (user.watching) {
    //         console.log(user.watching);
    //         user.watching.map(async (watchin, i) => {
    //             const request = await fetch(`${SERVER}/api/v1/anime/info`,
    //                 {
    //                     method: "POST",
    //                     headers: { 'Content-Type': 'application/json' },
    //                     body: JSON.stringify({ anilistId: watchin })
    //                 })
    //             const response = await request.json();
    //             if (request.status === 200) { setWatchingInfos([...watchingInfos, response]); }
    //         })
    //     }
    // }

    useEffect(() => {
        // getList();
    }, [user])
    return (
        <section className="container">
            <section className="profile_banner">
                <section className="profile_banner_inner">
                    <img
                        className="profile_avatar"
                        src="https://i.pinimg.com/736x/85/3f/11/853f116a28db7928f4f2e2c4dda517ff.jpg"
                        alt="profile_image"
                        draggable='false' />
                    <h1 className="profile_username">{user.username}</h1>
                </section>
            </section>
            <section className="profile_lists">
                <div className="list_indi">
                    <p>Watching:</p>
                    <div className="list_inner">
                        {user.watching && user.watching.map((watchin, i) => {
                            return <p key={i}>{i + 1}. <NavLink to={`/streaming/${watchin}`}>{String(watchin).replace(/-/g, ' ')}</NavLink></p>
                        })}
                    </div>
                </div>
                <div className="list_indi">
                    <p>Watched:</p>
                    <div className="list_inner">
                        {user.watched && user.watched.map((watchin, i) => {
                            return <p key={i}>{i + 1}. <NavLink to={`/streaming/${watchin}`}>{String(watchin).replace(/-/g, ' ')}</NavLink></p>
                        })}
                    </div>
                </div>
                <div className="list_indi">
                    <p>Planning:</p>
                    <div className="list_inner">
                        {user.planning && user.planning.map((watchin, i) => {
                            return <p key={i}>{i + 1}. <NavLink to={`/streaming/${watchin}`}>{String(watchin).replace(/-/g, ' ')}</NavLink></p>
                        })}
                    </div>
                </div>
                <div className="list_indi">
                    <p>On Hold:</p>
                    <div className="list_inner">
                        {user.onhold && user.onhold.map((watchin, i) => {
                            return <p key={i}>{i + 1}. <NavLink to={`/streaming/${watchin}`}>{String(watchin).replace(/-/g, ' ')}</NavLink></p>
                        })}
                    </div>
                </div>
                <div className="list_indi">
                    <p>Dropped:</p>
                    <div className="list_inner">
                        {user.dropped && user.dropped.map((watchin, i) => {
                            return <p key={i}>{i + 1}. <NavLink to={`/streaming/${watchin}`}>{String(watchin).replace(/-/g, ' ')}</NavLink></p>
                        })}
                    </div>
                </div>
            </section>
        </section>
    )
}
