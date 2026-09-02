import type { Metadata } from "next";
import "./globals.css";

const title = "빅네임 - 숨어 있는 실력을 이름값으로";
const description =
  "마케팅과 퍼스널 브랜딩 교육. 실력은 있는데 이름이 알려지지 않은 사람을 위한 빅네임.";

export const metadata: Metadata = {
  // TODO: 도메인이 정해지면 .env.local 에 NEXT_PUBLIC_SITE_URL=https://... 을 넣으세요.
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ko_KR",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
