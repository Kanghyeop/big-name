import { cookies } from "next/headers";

/**
 * 어드민 접근 확인.
 *
 * 지금은 비밀번호 하나로 들어가는 방식입니다. 신청 내역에 연락처가 들어 있으니
 * 배포 전에는 .env.local 이 아닌 배포 환경변수에 긴 비밀번호를 넣어야 합니다.
 * 이용자가 늘면 Supabase Auth 로 옮기는 편이 낫습니다.
 */

export const ADMIN_COOKIE = "bn_admin";

/**
 * 소스에 기본 비밀번호를 두지 않습니다. 저장소가 공개되면 그 값이 그대로
 * 드러나고, 환경변수를 깜빡한 배포가 곧바로 열린 어드민이 됩니다.
 * 값이 없으면 아무도 못 들어가는 쪽이 안전합니다.
 */
export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? "";
}

export async function isAdmin() {
  const expected = getAdminPassword();
  if (!expected) return false;
  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === expected;
}
