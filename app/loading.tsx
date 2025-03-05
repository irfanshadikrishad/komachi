export default function Loading() {
  return (
    <section
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "95vh !important",
        padding: "25px 0",
      }}>
      <span className="loader"></span>
      <p>Loading...</p>
    </section>
  )
}
