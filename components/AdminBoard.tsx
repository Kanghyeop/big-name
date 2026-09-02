"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  STATUSES,
  STATUS_LABEL,
  type Inquiry,
  type Status,
} from "@/lib/inquiry-types";

const TYPE_LABEL: Record<string, string> = {
  consulting: "1:1 컨설팅",
  corporate: "기업 교육",
  course: "강의·전자책",
  etc: "그 외",
};

const BUDGET_LABEL: Record<string, string> = {
  "under-300": "300만원 미만",
  "300-1000": "300만원 - 1,000만원",
  "over-1000": "1,000만원 이상",
  undecided: "미정",
};

function formatDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}

export default function AdminBoard({ initial }: { initial: Inquiry[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const [toast, setToast] = useState("");

  const counts = useMemo(() => {
    const base: Record<string, number> = { all: items.length };
    for (const s of STATUSES) base[s] = 0;
    for (const it of items) base[it.status] += 1;
    return base;
  }, [items]);

  const shown = useMemo(
    () => (filter === "all" ? items : items.filter((i) => i.status === filter)),
    [items, filter]
  );

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

  async function changeStatus(id: string, status: Status) {
    setItems((prev) =>
      prev.map((it) => (it.id === id ? { ...it, status } : it))
    );
    const res = await fetch("/api/admin/inquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    if (!res.ok) {
      flash("상태를 바꾸지 못했습니다");
      router.refresh();
      return;
    }
    flash(`${STATUS_LABEL[status]}(으)로 바꿨습니다`);
  }

  async function logout() {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="admin-shell">
      <div className="admin-bar">
        <div className="wrap inner">
          <div className="title">
            빅네임 어드민<span>신청 {items.length}건</span>
          </div>
          <div>
            <button className="text-btn" onClick={() => router.refresh()}>
              새로고침
            </button>
            <button className="text-btn" onClick={logout}>
              로그아웃
            </button>
          </div>
        </div>
      </div>

      <div className="wrap admin-body">
        <div className="filters">
          <button
            className={`filter ${filter === "all" ? "on" : ""}`}
            onClick={() => setFilter("all")}
          >
            전체<span className="cnt">{counts.all}</span>
          </button>
          {STATUSES.map((s) => (
            <button
              key={s}
              className={`filter ${filter === s ? "on" : ""}`}
              onClick={() => setFilter(s)}
            >
              {STATUS_LABEL[s]}
              <span className="cnt">{counts[s]}</span>
            </button>
          ))}
        </div>

        {shown.length === 0 ? (
          <div className="empty">
            {items.length === 0
              ? "아직 들어온 신청이 없습니다. 신청 폼에서 하나 넣어보세요."
              : "이 상태에 해당하는 신청이 없습니다."}
          </div>
        ) : (
          <div className="rows">
            {shown.map((it) => {
              const open = openId === it.id;
              return (
                <div
                  key={it.id}
                  className={`row ${open ? "open" : ""}`}
                  onClick={() => setOpenId(open ? null : it.id)}
                >
                  <div className="row-top">
                    <span className={`tag ${it.status}`}>
                      {STATUS_LABEL[it.status]}
                    </span>
                    <span className="row-name">{it.name}</span>
                    <span className="tag">
                      {TYPE_LABEL[it.type] ?? it.type}
                    </span>
                    <span className="row-meta">{formatDate(it.createdAt)}</span>
                  </div>

                  <div className="row-msg">{it.message}</div>

                  {open && (
                    <>
                      <dl className="detail">
                        <div>
                          <dt>이메일</dt>
                          <dd
                            className="copyable"
                            onClick={(e) => {
                              e.stopPropagation();
                              copy(it.email, "이메일");
                            }}
                          >
                            {it.email}
                          </dd>
                        </div>
                        <div>
                          <dt>연락처</dt>
                          <dd
                            className="copyable"
                            onClick={(e) => {
                              e.stopPropagation();
                              copy(it.phone, "연락처");
                            }}
                          >
                            {it.phone}
                          </dd>
                        </div>
                        <div>
                          <dt>브랜드·소속</dt>
                          <dd>{it.brand || "-"}</dd>
                        </div>
                        <div>
                          <dt>예산</dt>
                          <dd>{BUDGET_LABEL[it.budget] ?? "선택 안 함"}</dd>
                        </div>
                      </dl>

                      <div
                        className="actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <span className="label">상태</span>
                        {STATUSES.map((s) => (
                          <button
                            key={s}
                            className={`mini ${it.status === s ? "on" : ""}`}
                            onClick={() => changeStatus(it.id, s)}
                          >
                            {STATUS_LABEL[s]}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
