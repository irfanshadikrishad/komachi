"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Card from "@/components/Card";
import styles from "@/styles/lists.module.css";
import footer_styles from "@/styles/footer.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { getTitle } from "@/utils/helpers";

export default function Lists() {
  const [results, setResults] = useState<any[]>([]);
  const [show, setShow] = useState<string | null>(
    useSearchParams().get("show")
  );

  const getShowResults = async (show: string) => {
    const request = await fetch(`/api/lists`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        show: show ? show : "all",
        page: 1,
        perPage: 27,
      }),
    });
    const response = await request.json();

    if (request.status === 200) {
      setResults(response);
      setShow(show);
    } else {
      console.log(results);
    }
  };

  useEffect(() => {
    getShowResults(show ? show : "all");
  }, []);
  return (
    <>
      <Navbar />
      <section className="container">
        <section className={footer_styles.list_Links}>
          <button
            style={{
              color: show === "all" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("all");
              getShowResults("all");
            }}
          >
            All
          </button>
          <button
            style={{
              color: show === "0-9" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("0-9");
              getShowResults("0-9");
            }}
          >
            0-9
          </button>
          <button
            style={{
              color: show === "A" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("A");
              getShowResults("A");
            }}
          >
            A
          </button>
          <button
            style={{
              color: show === "B" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("B");
              getShowResults("B");
            }}
          >
            B
          </button>
          <button
            style={{
              color: show === "C" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("C");
              getShowResults("C");
            }}
          >
            C
          </button>
          <button
            style={{
              color: show === "D" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("D");
              getShowResults("D");
            }}
          >
            D
          </button>
          <button
            style={{
              color: show === "E" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("E");
              getShowResults("E");
            }}
          >
            E
          </button>
          <button
            style={{
              color: show === "F" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("F");
              getShowResults("F");
            }}
          >
            F
          </button>
          <button
            style={{
              color: show === "G" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("G");
              getShowResults("G");
            }}
          >
            G
          </button>
          <button
            style={{
              color: show === "H" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("H");
              getShowResults("H");
            }}
          >
            H
          </button>
          <button
            style={{
              color: show === "I" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("I");
              getShowResults("I");
            }}
          >
            I
          </button>
          <button
            style={{
              color: show === "J" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("J");
              getShowResults("J");
            }}
          >
            J
          </button>
          <button
            style={{
              color: show === "K" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("K");
              getShowResults("K");
            }}
          >
            K
          </button>
          <button
            style={{
              color: show === "L" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("L");
              getShowResults("L");
            }}
          >
            L
          </button>
          <button
            style={{
              color: show === "M" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("M");
              getShowResults("M");
            }}
          >
            M
          </button>
          <button
            style={{
              color: show === "N" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("N");
              getShowResults("N");
            }}
          >
            N
          </button>
          <button
            style={{
              color: show === "O" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("O");
              getShowResults("O");
            }}
          >
            O
          </button>
          <button
            style={{
              color: show === "P" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("P");
              getShowResults("P");
            }}
          >
            P
          </button>
          <button
            style={{
              color: show === "Q" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("Q");
              getShowResults("Q");
            }}
          >
            Q
          </button>
          <button
            style={{
              color: show === "R" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("R");
              getShowResults("R");
            }}
          >
            R
          </button>
          <button
            style={{
              color: show === "S" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("S");
              getShowResults("S");
            }}
          >
            S
          </button>
          <button
            style={{
              color: show === "T" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("T");
              getShowResults("T");
            }}
          >
            T
          </button>
          <button
            style={{
              color: show === "U" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("U");
              getShowResults("U");
            }}
          >
            U
          </button>
          <button
            style={{
              color: show === "V" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("V");
              getShowResults("V");
            }}
          >
            V
          </button>
          <button
            style={{
              color: show === "W" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("W");
              getShowResults("W");
            }}
          >
            W
          </button>
          <button
            style={{
              color: show === "X" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("X");
              getShowResults("X");
            }}
          >
            X
          </button>
          <button
            style={{
              color: show === "Y" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("Y");
              getShowResults("Y");
            }}
          >
            Y
          </button>
          <button
            style={{
              color: show === "Z" ? "var(--primary)" : "var(--color)",
            }}
            onClick={() => {
              setShow("Z");
              getShowResults("Z");
            }}
          >
            Z
          </button>
        </section>
        <section className={styles.result_Container}>
          {results.length > 0
            ? results.map(
                (
                  {
                    title,
                    anilistId,
                    poster,
                    sub_episodes,
                    dub_episodes,
                    totalEpisodes,
                    isAdult,
                  },
                  idx
                ) => {
                  return (
                    <Card
                      key={idx}
                      title={getTitle(title)}
                      id={anilistId}
                      image={poster}
                      subCount={sub_episodes.length}
                      dubCount={dub_episodes.length}
                      totalCount={totalEpisodes}
                      isAdult={isAdult}
                      lastEpisode={
                        sub_episodes.length > 0
                          ? sub_episodes[sub_episodes.length - 1].number
                          : dub_episodes[dub_episodes.length - 1].number
                      }
                    />
                  );
                }
              )
            : Array.from({ length: 20 }).map((_, index) => {
                return (
                  <Skeleton
                    key={index}
                    height={273}
                    baseColor="var(--secondary)"
                    highlightColor="var(--background)"
                  />
                );
              })}
        </section>
      </section>
      <Footer />
    </>
  );
}
