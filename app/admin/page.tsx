import type { Metadata } from "next";
import { isAdmin } from "@/lib/auth";
import { listInquiries } from "@/lib/inquiries";
import AdminLogin from "@/components/AdminLogin";
import AdminBoard from "@/components/AdminBoard";

export const metadata: Metadata = {
  title: "어드민 - 빅네임",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  if (!(await isAdmin())) {
    return <AdminLogin />;
  }
  const items = await listInquiries();
  return <AdminBoard initial={items} />;
}
