import { Helmet } from "react-helmet";

export default function E404() {
  return (
    <section className="container">
      <Helmet>
        <title>Konami - 404 not found</title>
        <meta name="description" content="Konami - 404 not found" />
        <meta
          name="keywords"
          content="konami, 404, page not found, konami error page"
        />
      </Helmet>
      <div className="e404">
        <h1>Who's there!?</h1>
        <img width={200} draggable="false" src="./angry_chan.png" alt="e404" />
        <h1>Look where are you going.</h1>
        <h1>Nothings here. Go back.</h1>
      </div>
    </section>
  );
}
