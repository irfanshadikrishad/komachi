import { useEffect } from "react";
import { useAuth } from "../store/auth.jsx";

export default function Profile() {
    const { user } = useAuth();

    useEffect(() => { }, [user])
    return (
        <section className="container">
            <p>Welcome, {user.username}!</p>
            <p>Nothing here for now, But updates coming soon!</p>
        </section>
    )
}