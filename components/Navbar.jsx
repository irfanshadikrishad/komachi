"use client";
import { useState, useRef, useEffect } from "react";
import Logo from "@/components/Logo";
import styles from "@/styles/navbar.module.css";
import { useRouter } from "next/navigation";
// ICONS
import { FiSearch } from "react-icons/fi";
import { RiUser6Line } from "react-icons/ri";

export default function Navbar() {
  const router = useRouter();
  const searchRef = useRef(null);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?query=${query}`);
      setQuery("");
    }
  };

  useEffect(() => {
    if (searchOpen && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchOpen]);

  return (
    <nav className={`container ${styles.navbar}`}>
      <section>
        <Logo />
      </section>
      <section className={styles.right_btns}>
        <form onSubmit={handleSubmit} className={styles.query}>
          {searchOpen && (
            <input
              ref={searchRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search..."
              type="text"
              autoComplete="off"
            />
          )}
          <button type="button" onClick={() => setSearchOpen(!searchOpen)}>
            <FiSearch />
          </button>
        </form>
        <button disabled>
          <RiUser6Line />
        </button>
      </section>
    </nav>
  );
}
