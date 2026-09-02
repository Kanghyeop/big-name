import type { Metadata } from "next";
import "./admin.css";
import { isAdmin } from "@/lib/auth";
import { listInquiries } from "@/lib/inquiries";
import { categoryOf } from "@/lib/inquiry-types";
import AdminShell from "@/components/admin/AdminShell";

export const metadata: Metadata = {
  title: "어드민 - 빅네임",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 미인증 요청은 미들웨어가 /admin/login 으로 돌립니다. 여기 걸리는 것은
  // 로그인 페이지뿐이라 셸을 씌우지 않고 그대로 내보냅니다.
  if (!(await isAdmin())) {
    return <>{children}</>;
  }

  // 사이드바에 표시할 미처리 건수
  const all = await listInquiries();
  const pending = all.filter((i) => i.status === "new");
  const counts = {
    applications: pending.filter((i) => categoryOf(i.type) === "applications")
      .length,
    inbound: pending.filter((i) => categoryOf(i.type) === "inbound").length,
  };

  return <AdminShell counts={counts}>{children}</AdminShell>;
}
