import React from "react";
import ReactPlayer from "react-player";

export default function App() {
  return <section style={{
    height: "100vh",
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
    alignItems: "center",
    justifyContent: 'center',
  }}>
    <ReactPlayer
      width="50%"
      height="auto"
      playing
      controls={true}
      url='https://www047.vipanicdn.net/streamhls/28afe59d8c7c52f5b55f1d08fdb61867/ep.1.1689903275.m3u8' />
    <img src="/foxtream.png"
      alt="foxtream"
      draggable={false}
      style={{ width: "150px" }} />
    <h1 style={{ fontStyle: "italic" }}>Foxtream</h1>
    <h1>Coming Soon</h1>
    <a
      style={{
        color: "rgb(100 100 100)",
        backgroundColor: "rgb(20 20 20)",
        textDecoration: 'none',
        paddingTop: 1,
        paddingBottom: 1,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,
        fontSize: 14
      }}
      href="https://www.youtube.com/@irfanshadikrishad">
      @ Irfan Shadik Rishad
    </a>
  </section >
}