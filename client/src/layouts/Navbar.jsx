import { NavLink, useNavigate } from "react-router-dom";
import { VscGithubInverted } from "react-icons/vsc";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');

    const searchPage = async (e) => {
        e.preventDefault();
        navigate(`/search/${searchText}`);
    }

    return <nav className="container">
        <section className="navbar">
            <NavLink to="/" className="navbar_I">
                <img
                    className="navbarLogo"
                    src="/foxtream.png"
                    alt="foxtream logo"
                    draggable="false" />
            </NavLink>
            <form onSubmit={searchPage} className="searchEngine">
                <div className="searchContain">
                    <input
                        onChange={(e) => { setSearchText(e.target.value) }}
                        value={searchText}
                        name="search"
                        placeholder="Search something ..."
                        className="searchField"
                        type="search"
                        autoComplete="off"
                    />
                    <button type="submit" className="searchButton">
                        {<FiSearch />}
                    </button>
                </div>
            </form>
            <section className="navbarSocialLinks">
                <a
                    className="navbarSocialLink"
                    href="https://github.com/irfanshadikrishad"
                    target="_blank">
                    {<VscGithubInverted />}
                </a>
                <a
                    className="navbarSocialLink"
                    href="https://youtube.com/@irfanshadikrishad"
                    target="_blank">
                    {<TbBrandYoutubeFilled />}
                </a>
            </section>
        </section>
    </nav>
}