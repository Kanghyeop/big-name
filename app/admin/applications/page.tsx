import { listByCategory } from "@/lib/inquiries";
import InquiryList from "@/components/admin/InquiryList";

export default async function ApplicationsPage() {
  const items = await listByCategory("applications");

  return (
    <>
      <div className="ad-head">
        <div>
          <h1>신청 관리</h1>
          <p>1:1 컨설팅과 기업 교육 신청입니다. 이름을 누르면 상세로 갑니다.</p>
        </div>
      </div>
      <InquiryList
        items={items}
        basePath="/admin/applications"
        emptyText="아직 들어온 신청이 없습니다."
      />
    </>
  );
}
