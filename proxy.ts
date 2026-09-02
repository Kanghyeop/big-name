import { NextResponse, type NextRequest } from "next/server";

/**
 * 어드민 접근 차단 (Next 16 의 proxy 파일 규칙).
 *
 * 레이아웃에서 로그인 화면을 대신 보여주는 방식으로는 부족합니다. 그렇게 하면
 * 하위 페이지가 서버에서 이미 렌더되어 신청자 이름·연락처가 응답 페이로드에
 * 실려 나갑니다. 그래서 요청 단계에서 막습니다.
 */

const COOKIE = "bn_admin";

export default function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  // ADMIN_PASSWORD 가 없으면 아무도 통과시키지 않습니다.
  const expected = process.env.ADMIN_PASSWORD;
  if (expected && req.cookies.get(COOKIE)?.value === expected) {
    return NextResponse.next();
  }

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
