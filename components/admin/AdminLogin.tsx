"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "로그인에 실패했습니다.");
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <div className="ad-login">
      <form className="ad-login-box" onSubmit={handleSubmit}>
        <div className="ad-login-brand">
          <span className="brand lg">BIG NAME</span>
        </div>
        <h1>어드민 콘솔</h1>
        <div className="desc">
          운영자 비밀번호를 입력하세요. 신청자의 연락처가 들어 있는 화면입니다.
        </div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          autoFocus
        />
        {error && <div className="error">{error}</div>}
        <button
          type="submit"
          className="btn btn-fill submit"
          disabled={loading || !password}
        >
          {loading ? "확인 중..." : "들어가기"}
        </button>
      </form>
    </div>
  );
}
