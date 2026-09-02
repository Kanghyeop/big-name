import { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ApplyForm from "@/components/ApplyForm";

export const metadata: Metadata = {
  title: "신청·문의 - 빅네임",
  description:
    "1:1 브랜딩 컨설팅, 기업 교육, 강의 문의를 남겨주세요. 검토 후 회신드립니다.",
};

export default function ApplyPage() {
  return (
    <>
      <Header />

      <div className="page-head">
        <div className="wrap narrow">
          <div className="eyebrow">APPLY</div>
          <h1>
            지금 어디에서
            <br />
            막혀 있는지 알려주세요
          </h1>
          <p>
            읽고 검토한 뒤 회신드립니다. 진행이 어려운 경우에도 이유를
            알려드립니다.
          </p>
        </div>
      </div>

      <div className="wrap narrow form-wrap">
        <Suspense fallback={<div className="form">불러오는 중...</div>}>
          <ApplyForm />
        </Suspense>
      </div>

      <Footer />
    </>
  );
}
