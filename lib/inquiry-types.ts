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
