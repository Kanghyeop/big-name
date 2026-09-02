import { promises as fs } from "fs";
import path from "path";
import type { Inquiry, NewInquiry, Status } from "./inquiry-types";

/**
 * 신청 데이터 저장소.
 *
 * 지금은 개발용으로 data/inquiries.json 파일에 쌓습니다. 로컬에서 폼 제출과
 * 어드민 조회가 실제로 돌아가게 하려는 목적입니다.
 *
 * Vercel 같은 곳에 올리면 파일 쓰기가 안 되므로, 배포 전에 이 파일의
 * listInquiries / createInquiry / updateStatus 세 함수만 Supabase 쿼리로
 * 바꾸면 됩니다. 다른 파일은 건드릴 필요가 없습니다.
 */

export * from "./inquiry-types";

const FILE = path.join(process.cwd(), "data", "inquiries.json");

async function readAll(): Promise<Inquiry[]> {
  try {
    const raw = await fs.readFile(FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Inquiry[]) : [];
  } catch {
    return [];
  }
}

async function writeAll(list: Inquiry[]) {
  await fs.mkdir(path.dirname(FILE), { recursive: true });
  await fs.writeFile(FILE, JSON.stringify(list, null, 2), "utf-8");
}

export async function listInquiries(): Promise<Inquiry[]> {
  const list = await readAll();
  return list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function createInquiry(input: NewInquiry): Promise<Inquiry> {
  const list = await readAll();
  const item: Inquiry = {
    ...input,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    createdAt: new Date().toISOString(),
    status: "new",
  };
  list.push(item);
  await writeAll(list);
  return item;
}

export async function updateStatus(
  id: string,
  status: Status
): Promise<Inquiry | null> {
  const list = await readAll();
  const found = list.find((x) => x.id === id);
  if (!found) return null;
  found.status = status;
  await writeAll(list);
  return found;
}
