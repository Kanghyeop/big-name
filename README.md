# 빅네임

마케팅과 퍼스널 브랜딩 교육 브랜드 "빅네임"의 랜딩 페이지와 문의 어드민.

## 실행

```bash
npm install
cp .env.example .env.local   # ADMIN_PASSWORD 를 채우세요
npm run dev
```

- 랜딩 http://localhost:3000
- 신청 폼 http://localhost:3000/apply
- 어드민 http://localhost:3000/admin

## 구조

```
app/
  page.tsx              랜딩
  apply/                컨설팅·기업교육·강의 문의 폼
  admin/                어드민 콘솔 (대시보드, 인바운드)
  api/apply/            문의 접수
  api/admin/            어드민 인증과 상태 변경
components/
  admin/                어드민 전용 컴포넌트
lib/
  inquiries.ts          문의 저장소
  inquiry-types.ts      문의 타입과 라벨
proxy.ts                어드민 접근 차단
```

## 아직 안 된 것

- **저장소가 로컬 파일입니다.** `data/inquiries.json` 에 쌓기 때문에 Vercel 등
  파일 쓰기가 안 되는 환경에서는 문의가 저장되지 않습니다. 배포 전에
  `lib/inquiries.ts` 의 `listInquiries` / `createInquiry` / `updateStatus` 를
  데이터베이스 쿼리로 바꿔야 합니다. 화면 코드는 건드릴 필요가 없습니다.
- 문의가 들어왔을 때 보내는 알림(이메일)이 없습니다. `app/api/apply/route.ts`
  에 붙일 자리를 표시해뒀습니다.
- 가격, 실적 수치, 사업자 정보가 비어 있습니다. 확정 전이라 지어내지 않고
  `000` 으로 두었습니다. 배포 전에 채워야 합니다.
- 강의·전자책 구매 버튼이 아직 결제 링크에 연결되어 있지 않습니다.

## 어드민

`ADMIN_PASSWORD` 환경변수 값으로 로그인합니다. 값이 없으면 아무도 들어갈 수
없습니다. 문의 목록에 신청자 연락처가 그대로 보이니 배포 환경에서는 충분히 긴
값을 쓰세요.
