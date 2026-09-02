"use client";

import Link from "next/link";
import { useState } from "react";

// TODO: 실제 문의 이메일로 교체하세요.
const EMAIL = "hello@bigname.kr";

// 카카오톡 채널을 만든 뒤 .env.local 에 넣으면 버튼이 나타납니다.
// NEXT_PUBLIC_KAKAO_CHANNEL_URL=https://pf.kakao.com/_xxxxxx
const KAKAO = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_URL;

export default function ContactActions() {
  const [toast, setToast] = useState("");

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setToast("이메일 주소를 복사했습니다");
    } catch {
      setToast(EMAIL);
    }
    setTimeout(() => setToast(""), 1800);
  }

  return (
    <>
      <div className="btns">
        <Link href="/apply" className="btn btn-fill">
          컨설팅 신청하기
        </Link>
        {/* 이메일은 메일 앱을 띄우지 않고 주소를 복사합니다. */}
        <button type="button" className="btn btn-line" onClick={copyEmail}>
          {EMAIL}
        </button>
        {KAKAO && (
          <a
            href={KAKAO}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-line"
          >
            카카오톡 채널
          </a>
        )}
      </div>
      {toast && <div className="toast">{toast}</div>}
    </>
  );
}
