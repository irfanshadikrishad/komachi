import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <div>
      <Link to="/" className="navbar_text_logo" style={{ display: "inline" }}>
        <p>Konami</p>
      </Link>
    </div>
  );
}
