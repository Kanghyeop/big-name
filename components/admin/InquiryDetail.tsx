"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BUDGET_LABEL,
  STATUSES,
  STATUS_LABEL,
  TYPE_LABEL,
  formatDate,
  type Inquiry,
  type Status,
} from "@/lib/inquiry-types";

export default function InquiryDetail({
  item,
  backHref,
  backLabel,
}: {
  item: Inquiry;
  backHref: string;
  backLabel: string;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<Status>(item.status);
  const [toast, setToast] = useState("");

  function flash(text: string) {
    setToast(text);
    setTimeout(() => setToast(""), 1600);
  }

  async function copy(text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      flash(`${label}를 복사했습니다`);
    } catch {
      flash("복사하지 못했습니다");
    }
  }

  async function change(next: Status) {
    const prev = status;
    setStatus(next);
    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: item.id, status: next }),
    });
    if (!res.ok) {
      setStatus(prev);
      flash("상태를 바꾸지 못했습니다");
      return;
    }
    flash(`${STATUS_LABEL[next]}(으)로 바꿨습니다`);
    router.refresh();
  }

  return (
    <>
      <Link href={backHref} className="ad-back">
        ← {backLabel}
      </Link>

      <div className="ad-head">
        <div>
          <h1>{item.name}</h1>
          <p>
            {TYPE_LABEL[item.type] ?? item.type} · {formatDate(item.createdAt)}
          </p>
        </div>
        <span className={`chip ${status}`}>{STATUS_LABEL[status]}</span>
      </div>

      <div className="ad-detail">
        <div className="ad-card ad-pad">
          <dl className="ad-dl">
            <div>
              <dt>이메일</dt>
              <dd
                className="copyable"
                onClick={() => copy(item.email, "이메일")}
              >
                {item.email}
              </dd>
            </div>
            <div>
              <dt>연락처</dt>
              <dd
                className="copyable"
                onClick={() => copy(item.phone, "연락처")}
              >
                {item.phone}
              </dd>
            </div>
            <div>
              <dt>브랜드·소속</dt>
              <dd>{item.brand || "-"}</dd>
            </div>
            <div>
              <dt>예산</dt>
              <dd>{BUDGET_LABEL[item.budget] ?? "선택 안 함"}</dd>
            </div>
          </dl>

          <div className="ad-msg">{item.message}</div>
        </div>

        <div className="ad-card ad-pad">
          <div className="ad-label">처리 상태</div>
          <div className="ad-actions">
            {STATUSES.map((s) => (
              <button
                key={s}
                className={`btn-sm ${status === s ? "on" : ""}`}
                onClick={() => change(s)}
              >
                {STATUS_LABEL[s]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
