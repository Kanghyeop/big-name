import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { listInquiries, updateStatus } from "@/lib/inquiries";
import { STATUSES, type Status } from "@/lib/inquiry-types";

export const runtime = "nodejs";

export async function GET() {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }
  return NextResponse.json({ items: await listInquiries() });
}

export async function PATCH(req: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "권한이 없습니다." }, { status: 401 });
  }

  const { id, status } = (await req.json().catch(() => ({}))) as {
    id?: string;
    status?: string;
  };

  if (!id || !status || !STATUSES.includes(status as Status)) {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const updated = await updateStatus(id, status as Status);
  if (!updated) {
    return NextResponse.json({ error: "찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json({ ok: true, item: updated });
}
