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
        {/*
          이 사이트에서 발생하는 매출은 빅네임(통신판매업·미디어 콘텐츠 창작)으로
          잡습니다. 광고대행 사업자인 브랜티크는 여기에 표기하지 않습니다.
          빅네임으로 들어온 거래에 브랜티크 계산서가 나가면 구매자가 혼란스럽습니다.

          TODO: 사업자등록번호, 통신판매업 신고번호, 주소, 이메일 채우기.
          통신판매업 신고번호는 온라인 판매 페이지에 표기 의무가 있습니다.
        */}
        <div className="biz">
          상호: 빅네임 · 대표: 공다현
          <br />
          사업자등록번호: 000-00-00000 · 통신판매업신고: 제0000-000000-00000호
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
