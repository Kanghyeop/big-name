import { listByCategory } from "@/lib/inquiries";
import InquiryList from "@/components/admin/InquiryList";

export default async function InboundPage() {
  const items = await listByCategory("inbound");

  return (
    <>
      <div className="ad-head">
        <div>
          <h1>인바운드</h1>
          <p>강의·전자책 문의와 그 외 문의입니다.</p>
        </div>
      </div>
      <InquiryList
        items={items}
        basePath="/admin/inbound"
        emptyText="아직 들어온 문의가 없습니다."
      />
    </>
  );
}
