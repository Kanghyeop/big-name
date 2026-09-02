import { NextResponse } from "next/server";
import { createInquiry } from "@/lib/inquiries";

export const runtime = "nodejs";

function str(v: unknown, max: number) {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 });
  }

  const name = str(body.name, 60);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const message = str(body.message, 5000);

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { error: "필수 항목이 비어 있습니다." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "이메일 형식이 맞지 않습니다." },
      { status: 400 }
    );
  }

  const saved = await createInquiry({
    name,
    email,
    phone,
    message,
    brand: str(body.brand, 200),
    type: str(body.type, 40) || "etc",
    budget: str(body.budget, 40),
  });

  // TODO: 이메일 알림 붙이는 자리. Resend 키가 준비되면 여기서 발송합니다.
  console.log(`[신청 접수] ${saved.name} / ${saved.type} / ${saved.email}`);

  return NextResponse.json({ ok: true, id: saved.id });
}
