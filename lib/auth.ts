import { cookies } from "next/headers";

/**
 * 어드민 접근 확인.
 *
 * 지금은 비밀번호 하나로 들어가는 방식입니다. 신청 내역에 연락처가 들어 있으니
 * 배포 전에는 .env.local 이 아닌 배포 환경변수에 긴 비밀번호를 넣어야 합니다.
 * 이용자가 늘면 Supabase Auth 로 옮기는 편이 낫습니다.
 */

export const ADMIN_COOKIE = "bn_admin";

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "bigname";
}

export async function isAdmin() {
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === getAdminPassword();
}
