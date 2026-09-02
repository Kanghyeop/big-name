"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  STATUSES,
  STATUS_LABEL,
  TYPE_LABEL,
  formatDate,
  type Inquiry,
  type Status,
} from "@/lib/inquiry-types";

/**
 * 신청·인바운드 공용 리스트.
 * 상태 탭으로 거르고, 이름을 누르면 상세로 갑니다.
 */
export default function InquiryList({
  items,
  basePath,
  emptyText,
}: {
  items: Inquiry[];
  basePath: string;
  emptyText: string;
}) {
  const [filter, setFilter] = useState<Status | "all">("all");

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

  return (
    <>
      <div className="ad-tabs">
        <button
          className={`ad-tab ${filter === "all" ? "on" : ""}`}
          onClick={() => setFilter("all")}
        >
          전체<span className="n">{counts.all}</span>
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={`ad-tab ${filter === s ? "on" : ""}`}
            onClick={() => setFilter(s)}
          >
            {STATUS_LABEL[s]}
            <span className="n">{counts[s]}</span>
          </button>
        ))}
      </div>

      <div className="ad-card">
        {shown.length === 0 ? (
          <div className="ad-empty">
            {items.length === 0 ? emptyText : "이 상태에 해당하는 건이 없습니다."}
          </div>
        ) : (
          <div className="ad-scroll">
            <table className="ad-table">
              <thead>
                <tr>
                  <th>상태</th>
                  <th>이름</th>
                  <th>유형</th>
                  <th>내용</th>
                  <th>연락처</th>
                  <th>접수일</th>
                </tr>
              </thead>
              <tbody>
                {shown.map((it) => (
                  <tr key={it.id}>
                    <td className="nowrap">
                      <span className={`chip ${it.status}`}>
                        {STATUS_LABEL[it.status]}
                      </span>
                    </td>
                    <td className="nowrap">
                      <Link href={`${basePath}/${it.id}`} className="strong">
                        {it.name}
                      </Link>
                    </td>
                    <td className="nowrap muted">
                      {TYPE_LABEL[it.type] ?? it.type}
                    </td>
                    <td>
                      <span className="clip">{it.message}</span>
                    </td>
                    <td className="nowrap muted">{it.phone}</td>
                    <td className="nowrap muted">{formatDate(it.createdAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
