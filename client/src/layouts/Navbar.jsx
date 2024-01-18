import { NavLink, useNavigate } from "react-router-dom";
import { VscGithubInverted } from "react-icons/vsc";
import { TbBrandYoutubeFilled } from "react-icons/tb";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth.jsx";
import { FaBars } from "react-icons/fa6";

export default function Navbar() {
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [isMenu, setIsMenu] = useState(false);

    const searchPage = async (e) => {
        e.preventDefault();
        navigate(`/search/${searchText}`);
    }

    const toggleMenu = async () => {
        setIsMenu(!isMenu);
    }

    useEffect(() => { }, [isLoggedIn]);
    return <nav className="container">
        <section className="navbar">
            <div>
                <NavLink to="/" className="navbar_I">
                    <img
                        className="navbarLogo"
                        src="/foxtream.png"
                        alt="foxtream logo"
                        draggable="false" />
                </NavLink>
            </div>
            <div className="navMenuBarSection">
                <button onClick={toggleMenu} className="navMenuBars">{<FaBars />}</button>
            </div>
            <section className="navMenu" style={{ display: isMenu ? 'flex !important' : 'none !important' }}>
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
                <section className="navbarLoginSignUp">
                    {isLoggedIn ? <NavLink to='/profile'>Profile</NavLink> : <>
                        <NavLink to='/login'>Login</NavLink>
                        <NavLink to='/signup' className="navbarLoginSignUp_SignUp">Sign Up</NavLink>
                    </>}
                </section>
            </section>
        </section>
    </nav>
}