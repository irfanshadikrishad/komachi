import { NavLink } from "react-router-dom";
import { VscGithubInverted } from "react-icons/vsc";
import { TbBrandYoutubeFilled } from "react-icons/tb";

export default function Navbar() {
    return <nav className="container">
        <section className="navbar">
            <NavLink to="/" className="navbar_I">
                <img className="navbarLogo" src="/foxtream.png" alt="foxtream logo"
                    draggable="false" />
            </NavLink>
            <section className="navbarSocialLinks">
                <a className="navbarSocialLink" href="https://github.com/irfanshadikrishad" target="_blank">
                    {<VscGithubInverted />}
                </a>
                <a className="navbarSocialLink" href="https://youtube.com/@irfanshadikrishad" target="_blank">
                    {<TbBrandYoutubeFilled />}
                </a>
            </section>
        </section>
    </nav>
}