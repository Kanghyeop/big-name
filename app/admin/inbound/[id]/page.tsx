import { notFound } from "next/navigation";
import { getInquiry } from "@/lib/inquiries";
import InquiryDetail from "@/components/admin/InquiryDetail";

export default async function InboundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = await getInquiry(id);
  if (!item) notFound();

  return (
    <InquiryDetail item={item} backHref="/admin/inbound" backLabel="인바운드" />
  );
}
