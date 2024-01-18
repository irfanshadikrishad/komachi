import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
// ICONS
import { FaBars } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
    const navigate = useNavigate();
    const [query, setQuery] = useState('');
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (query) {
            navigate(`/search/${query}`);
            setIsMenuOpen(!isMenuOpen);
            setQuery('');
        }
    }

    return (
        <nav>
            <section className="container navbar">
                <section>
                    <NavLink to="/">
                        <img className='navbar_logo' src="/foxtream.png" alt="foxtream_logo" />
                    </NavLink>
                </section>
                <section className={isMenuOpen ? "navbarII open" : "navbarII"}>
                    <form className='navbar_search_form' onSubmit={handleSearch}>
                        <input onChange={(e) => { setQuery(e.target.value) }}
                            value={query}
                            className='navbar_search'
                            type="search"
                            placeholder="Search..." />
                        <button className='navbar_search_icon'>
                            {<FiSearch />}
                        </button>
                    </form>
                    <section className='navbarLR'>
                        <NavLink to="/login" onClick={() => { setIsMenuOpen(!isMenuOpen) }} className="navbarLR_login">Login</NavLink>
                        <NavLink to="/signup" onClick={() => { setIsMenuOpen(!isMenuOpen) }} className="navbarLR_register">Sign Up</NavLink>
                    </section>
                </section>
                <section className='navbarMenu'>
                    <button onClick={() => { setIsMenuOpen(!isMenuOpen) }} className='navbarMenuButton'>{<FaBars />}</button>
                </section>
            </section>
        </nav>
    )
}
