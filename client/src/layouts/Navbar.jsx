import { NavLink } from "react-router-dom";

export default function Navbar() {
    return <nav className="container">
        <section className="navbar">
            <NavLink to="/" className="navbar_I">
                <img className="navbarLogo" src="/foxtream.png" alt="foxtream logo"
                    draggable="false" />
                <p className="foxstreamNavText">Foxtream</p>
            </NavLink>
        </section>
    </nav>
}