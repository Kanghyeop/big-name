import { listInquiries } from "@/lib/inquiries";
import InquiryList from "@/components/admin/InquiryList";

export default async function InboundPage() {
  const items = await listInquiries();

  return (
    <>
      <div className="ad-head">
        <div>
          <h1>인바운드</h1>
          <p>홈페이지로 들어온 신청과 문의 전부입니다. 이름을 누르면 상세로 갑니다.</p>
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
