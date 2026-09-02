import { NextResponse, type NextRequest } from "next/server";

/**
 * 어드민 접근 차단.
 *
 * 레이아웃에서 로그인 화면을 대신 보여주는 방식으로는 부족합니다. 그렇게 하면
 * 하위 페이지가 서버에서 이미 렌더되어 신청자 이름·연락처가 응답 페이로드에
 * 실려 나갑니다. 그래서 요청 단계에서 막습니다.
 */

const COOKIE = "bn_admin";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname === "/admin/login") return NextResponse.next();

  const expected = process.env.ADMIN_PASSWORD ?? "bigname";
  if (req.cookies.get(COOKIE)?.value === expected) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = "/admin/login";
  url.search = "";
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
