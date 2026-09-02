import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-top">
          <div className="logo">빅네임</div>
          <nav className="foot-links">
            <Link href="/#products">강의·전자책</Link>
            <Link href="/#corporate">기업 교육</Link>
            <Link href="/#consulting">1:1 컨설팅</Link>
            <Link href="/apply">신청·문의</Link>
          </nav>
        </div>
        {/* TODO: 사업자 정보 채우기. 전자상거래법상 판매 페이지에는 필수입니다. */}
        <div className="biz">
          상호: 빅네임 · 대표: 김다현
          <br />
          사업자등록번호: 000-00-00000
          <br />
          주소: 000
          <br />
          이메일: 000
        </div>
        <div className="copy">© 2026 BIGNAME. All rights reserved.</div>
      </div>
    </footer>
  );
}
