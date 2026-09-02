import Link from "next/link";
import { listInquiries } from "@/lib/inquiries";
import { STATUS_LABEL, TYPE_LABEL, formatDate } from "@/lib/inquiry-types";

export default async function AdminDashboard() {
  const all = await listInquiries();

  const today = new Date().toDateString();
  const stats = [
    { label: "전체 문의", value: all.length },
    {
      label: "미처리",
      value: all.filter((i) => i.status === "new").length,
      alert: true,
    },
    {
      label: "오늘 들어온 건",
      value: all.filter((i) => new Date(i.createdAt).toDateString() === today)
        .length,
    },
    {
      label: "회신 완료",
      value: all.filter((i) => i.status === "done").length,
    },
  ];

  const recent = all.slice(0, 8);

  return (
    <>
      <div className="ad-head">
        <div>
          <h1>대시보드</h1>
          <p>들어온 문의 현황을 한눈에 봅니다.</p>
        </div>
      </div>

      <div className="ad-stats">
        {stats.map((s) => (
          <div key={s.label} className="ad-card ad-pad ad-stat">
            <div className="k">{s.label}</div>
            <div className={`v ${s.alert && s.value > 0 ? "alert" : ""}`}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div className="ad-head">
        <div>
          <h1 style={{ fontSize: 16 }}>최근 문의</h1>
        </div>
      </div>

      <div className="ad-card">
        {recent.length === 0 ? (
          <div className="ad-empty">
            아직 들어온 문의가 없습니다. 신청 폼에서 하나 넣어보세요.
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
                  <th>접수일</th>
                </tr>
              </thead>
              <tbody>
                {recent.map((it) => (
                  <tr key={it.id}>
                    <td className="nowrap">
                      <span className={`chip ${it.status}`}>
                        {STATUS_LABEL[it.status]}
                      </span>
                    </td>
                    <td className="nowrap">
                      <Link
                        href={`/admin/inbound/${it.id}`}
                        className="strong"
                      >
                        {it.name}
                      </Link>
                    </td>
                    <td className="nowrap muted">
                      {TYPE_LABEL[it.type] ?? it.type}
                    </td>
                    <td>
                      <span className="clip">{it.message}</span>
                    </td>
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
