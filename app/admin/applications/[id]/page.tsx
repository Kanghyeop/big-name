import { notFound } from "next/navigation";
import { getInquiry } from "@/lib/inquiries";
import InquiryDetail from "@/components/admin/InquiryDetail";

export default async function ApplicationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getInquiry(id);
  if (!item) notFound();

  return (
    <InquiryDetail
      item={item}
      backHref="/admin/applications"
      backLabel="신청 관리"
    />
  );
}
