import Image from "next/image";

/**
 * 로고. 원본은 _reference/logo-original.png 에 있고, public/logo.png 는
 * 웹용으로 512px 로 줄인 것입니다.
 */
export default function Logo({ size = 40 }: { size?: number }) {
  return (
    <Image
      src="/logo.png"
      alt="빅네임"
      width={size}
      height={size}
      className="brand"
      priority
    />
  );
}
