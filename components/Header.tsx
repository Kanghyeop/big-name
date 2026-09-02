import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="wrap nav">
        <Link href="/" className="logo">
          빅네임
        </Link>
        <nav className="nav-links">
          <Link href="/#products">강의·전자책</Link>
          <Link href="/#corporate">기업 교육</Link>
          <Link href="/#consulting">1:1 컨설팅</Link>
        </nav>
        <Link href="/apply" className="nav-cta">
          컨설팅 신청하기
        </Link>
      </div>
    </header>
  );
}
