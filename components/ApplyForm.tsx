"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

type FormState = {
  name: string;
  email: string;
  phone: string;
  brand: string;
  type: string;
  budget: string;
  message: string;
  agree: boolean;
};

type Errors = Partial<Record<keyof FormState, string>>;

const EMPTY: FormState = {
  name: "",
  email: "",
  phone: "",
  brand: "",
  type: "consulting",
  budget: "",
  message: "",
  agree: false,
};

const TYPES = [
  { value: "consulting", label: "1:1 브랜딩 컨설팅" },
  { value: "corporate", label: "기업 교육·강연" },
  { value: "course", label: "강의·전자책 문의" },
  { value: "etc", label: "그 외 문의" },
];

const BUDGETS = [
  { value: "", label: "선택 안 함" },
  { value: "under-300", label: "300만원 미만" },
  { value: "300-1000", label: "300만원 - 1,000만원" },
  { value: "over-1000", label: "1,000만원 이상" },
  { value: "undecided", label: "아직 정하지 못했습니다" },
];

function validate(v: FormState): Errors {
  const e: Errors = {};
  if (!v.name.trim()) e.name = "이름을 입력해주세요.";
  if (!v.email.trim()) e.email = "이메일을 입력해주세요.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email))
    e.email = "이메일 형식이 맞지 않습니다.";
  if (!v.phone.trim()) e.phone = "연락처를 입력해주세요.";
  else if (!/^[0-9-+\s()]{9,20}$/.test(v.phone))
    e.phone = "연락처 형식을 확인해주세요.";
  if (!v.message.trim()) e.message = "현재 상황을 적어주세요.";
  else if (v.message.trim().length < 20)
    e.message = "20자 이상 적어주시면 검토에 도움이 됩니다.";
  if (!v.agree) e.agree = "개인정보 수집에 동의해주세요.";
  return e;
}

export default function ApplyForm() {
  const params = useSearchParams();
  const initialType = params.get("type");

  const [values, setValues] = useState<FormState>({
    ...EMPTY,
    type: TYPES.some((t) => t.value === initialType)
      ? (initialType as string)
      : EMPTY.type,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [sendError, setSendError] = useState("");
  const [done, setDone] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      const first = document.querySelector<HTMLElement>(".invalid");
      first?.scrollIntoView({ behavior: "smooth", block: "center" });
      first?.focus();
      return;
    }

    setSubmitting(true);
    setSendError("");

    const res = await fetch("/api/apply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    }).catch(() => null);

    setSubmitting(false);

    if (!res || !res.ok) {
      const data = res ? await res.json().catch(() => ({})) : {};
      setSendError(
        data.error ?? "보내지 못했습니다. 잠시 뒤 다시 시도해주세요."
      );
      return;
    }

    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (done) {
    return (
      <div className="done">
        <div className="mark">✓</div>
        <h2>신청이 접수되었습니다</h2>
        <p>
          영업일 기준 2일 안에 적어주신 연락처로 회신드립니다.
          <br />
          검토 결과에 따라 진행이 어려울 수도 있는 점 양해 부탁드립니다.
        </p>
        <Link href="/" className="btn btn-line">
          홈으로 돌아가기
        </Link>
      </div>
    );
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="name">
          이름<span className="req">*</span>
        </label>
        <input
          id="name"
          type="text"
          value={values.name}
          onChange={(e) => update("name", e.target.value)}
          className={errors.name ? "invalid" : ""}
          placeholder="공다현"
        />
        {errors.name && <div className="error">{errors.name}</div>}
      </div>

      <div className="field">
        <label htmlFor="email">
          이메일<span className="req">*</span>
        </label>
        <input
          id="email"
          type="email"
          value={values.email}
          onChange={(e) => update("email", e.target.value)}
          className={errors.email ? "invalid" : ""}
          placeholder="name@example.com"
        />
        {errors.email && <div className="error">{errors.email}</div>}
      </div>

      <div className="field">
        <label htmlFor="phone">
          연락처<span className="req">*</span>
        </label>
        <input
          id="phone"
          type="tel"
          value={values.phone}
          onChange={(e) => update("phone", e.target.value)}
          className={errors.phone ? "invalid" : ""}
          placeholder="010-0000-0000"
        />
        {errors.phone && <div className="error">{errors.phone}</div>}
      </div>

      <div className="field">
        <label htmlFor="brand">
          브랜드 또는 소속
          <div className="hint">
            개인이면 활동명이나 채널 주소를 적어주셔도 됩니다.
          </div>
        </label>
        <input
          id="brand"
          type="text"
          value={values.brand}
          onChange={(e) => update("brand", e.target.value)}
          placeholder="빅네임 / instagram.com/bigname"
        />
      </div>

      <div className="field">
        <label htmlFor="type">
          어떤 것이 필요하신가요<span className="req">*</span>
        </label>
        <select
          id="type"
          value={values.type}
          onChange={(e) => update("type", e.target.value)}
        >
          {TYPES.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="budget">예산 범위</label>
        <select
          id="budget"
          value={values.budget}
          onChange={(e) => update("budget", e.target.value)}
        >
          {BUDGETS.map((b) => (
            <option key={b.value} value={b.value}>
              {b.label}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label htmlFor="message">
          현재 상황과 고민<span className="req">*</span>
          <div className="hint">
            지금 무엇을 하고 계신지, 어디서 막혀 있는지 구체적으로 적어주실수록
            검토가 정확해집니다.
          </div>
        </label>
        <textarea
          id="message"
          value={values.message}
          onChange={(e) => update("message", e.target.value)}
          className={errors.message ? "invalid" : ""}
          placeholder="예) 3년째 공방을 운영 중인데 단골 외에는 유입이 없습니다. 인스타그램은 하고 있지만 무엇을 올려야 할지 모르겠습니다."
        />
        {errors.message && <div className="error">{errors.message}</div>}
      </div>

      <label className="agree">
        <input
          type="checkbox"
          checked={values.agree}
          onChange={(e) => update("agree", e.target.checked)}
        />
        <span>
          상담 진행을 위해 이름, 이메일, 연락처를 수집하며 문의 처리 후 1년간
          보관합니다. 동의를 거부하실 수 있으나 이 경우 상담 신청이
          제한됩니다.
        </span>
      </label>
      {errors.agree && <div className="error">{errors.agree}</div>}

      {sendError && <div className="error">{sendError}</div>}

      <button type="submit" className="btn btn-fill submit" disabled={submitting}>
        {submitting ? "보내는 중..." : "신청 보내기"}
      </button>
    </form>
  );
}
