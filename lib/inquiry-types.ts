/**
 * 신청 데이터의 타입과 상수. 서버·클라이언트 양쪽에서 씁니다.
 * 실제 저장 로직(파일시스템)은 lib/inquiries.ts 에 있고 서버에서만 불러야 합니다.
 */

export const STATUSES = ["new", "doing", "done", "drop"] as const;
export type Status = (typeof STATUSES)[number];

export const STATUS_LABEL: Record<Status, string> = {
  new: "신규",
  doing: "검토중",
  done: "회신완료",
  drop: "보류",
};

export type Inquiry = {
  id: string;
  createdAt: string;
  status: Status;
  name: string;
  email: string;
  phone: string;
  brand: string;
  type: string;
  budget: string;
  message: string;
};

export type NewInquiry = Omit<Inquiry, "id" | "createdAt" | "status">;

/**
 * 문의 유형과 어드민 화면의 분류.
 *
 * 폼으로 들어온 컨설팅·기업교육은 실제 "신청"이고, 강의 문의나 그 외는
 * 단순 "인바운드"로 봅니다. 나중에 유형이 늘면 여기만 고치면 됩니다.
 */
export const TYPE_LABEL: Record<string, string> = {
  consulting: "1:1 컨설팅",
  corporate: "기업 교육",
  course: "강의·전자책",
  etc: "그 외",
};

export const BUDGET_LABEL: Record<string, string> = {
  "under-300": "300만원 미만",
  "300-1000": "300만원 - 1,000만원",
  "over-1000": "1,000만원 이상",
  undecided: "미정",
};

export type Category = "applications" | "inbound";

const APPLICATION_TYPES = ["consulting", "corporate"];

export function categoryOf(type: string): Category {
  return APPLICATION_TYPES.includes(type) ? "applications" : "inbound";
}

export function formatDate(iso: string) {
  const d = new Date(iso);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
}
