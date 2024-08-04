"use client";
import { useState } from "react";
import Logo from "@/components/Logo";
import styles from "@/styles/navbar.module.css";
import { useRouter } from "next/navigation";
// ICONS
import { FiSearch } from "react-icons/fi";
import { RiUser6Line } from "react-icons/ri";

export default function Navbar() {
  const router = useRouter();
  const [query, setQuery] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (query) {
      router.push(`/search?query=${query}`);
      setQuery("");
    }
  };

  return (
    <nav className={`container ${styles.navbar}`}>
      <section>
        <Logo />
      </section>
      <section className={styles.right_btns}>
        <form onSubmit={handleSubmit} className={styles.query}>
          {searchOpen && (
            <input
              onChange={(e) => {
                setQuery(e.target.value);
              }}
              placeholder="Search..."
              type="text"
              autoComplete="false"
            />
          )}
          <button
            onClick={() => {
              setSearchOpen(!searchOpen);
            }}
          >
            {<FiSearch />}
          </button>
        </form>
        <button disabled>{<RiUser6Line />}</button>
      </section>
    </nav>
  );
}
