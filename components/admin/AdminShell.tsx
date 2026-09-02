"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconGrid, IconInbox, IconMenu, IconX } from "./icons";

/**
 * 어드민 껍데기.
 *
 * 메뉴는 이 배열 하나로 관리합니다. 나중에 회원 관리, 상품 관리가 붙으면
 * 여기에 한 줄 추가하고 app/admin/<경로>/page.tsx 를 만들면 됩니다.
 */
const MENU = [
  { href: "/admin", label: "대시보드", Icon: IconGrid, badge: false },
  {
    href: "/admin/inbound",
    label: "인바운드",
    Icon: IconInbox,
    badge: true,
  },
];

export type NavCounts = { pending: number };

export default function AdminShell({
  counts,
  children,
}: {
  counts: NavCounts;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [drawer, setDrawer] = useState(false);

  // 경로가 바뀌면 모바일 서랍을 닫는다
  useEffect(() => setDrawer(false), [pathname]);

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  const nav = (
    <>
      <div className="ad-side-head">
        <div>
          <div className="kicker">BIGNAME</div>
          <div className="name">어드민 콘솔</div>
        </div>
        <button
          onClick={() => setDrawer(false)}
          aria-label="메뉴 닫기"
          className="icon-btn"
          style={{ display: drawer ? "flex" : "none" }}
        >
          <IconX />
        </button>
      </div>

      <nav className="ad-nav">
        {MENU.map(({ href, label, Icon, badge }) => {
          const active =
            href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
          const n = badge ? counts.pending : 0;
          return (
            <Link key={href} href={href} className={active ? "on" : ""}>
              <Icon />
              {label}
              {n > 0 && <span className="n">{n}</span>}
            </Link>
          );
        })}
      </nav>

      <div className="ad-side-foot">
        <div className="ad-me">
          <div className="avatar">공</div>
          <div className="who">
            <b>공다현</b>
            <span>운영자</span>
          </div>
          <button className="out" onClick={logout}>
            로그아웃
          </button>
        </div>
      </div>
    </>
  );

  return (
    <div className="ad">
      <header className="ad-top">
        <button
          onClick={() => setDrawer(true)}
          aria-label="메뉴 열기"
          className="icon-btn"
        >
          <IconMenu />
        </button>
        <strong>어드민 콘솔</strong>
      </header>

      <aside className="ad-side">{nav}</aside>

      {drawer && (
        <div className="ad-scrim" onClick={() => setDrawer(false)}>
          <aside className="ad-drawer" onClick={(e) => e.stopPropagation()}>
            {nav}
          </aside>
        </div>
      )}

      <main className="ad-main">
        <div className="ad-inner">{children}</div>
      </main>
    </div>
  );
}
