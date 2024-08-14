import Link from "next/link";

export default function Logo() {
  return (
    <div>
      <Link href="/" className="navbar_text_logo" style={{ display: "inline" }}>
        <p>Komachi</p>
      </Link>
    </div>
  );
}
