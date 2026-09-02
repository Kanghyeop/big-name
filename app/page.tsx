import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />

      {/* 히어로 */}
      <div className="hero">
        <div className="wrap">
          <h1>
            숨어 있는 실력을
            <br />
            이름값으로
          </h1>
          <p>
            실력은 이미 있습니다. 알려지지 않았을 뿐입니다.
            <br />
            빅네임은 그 실력이 이름으로 남게 만드는 교육을 합니다.
          </p>
          <div className="btns">
            <Link href="#products" className="btn btn-fill">
              강의 보러가기
            </Link>
            <Link href="/apply" className="btn btn-line">
              컨설팅 신청하기
            </Link>
          </div>

          {/* TODO: 실제 수치로 교체. 확정 전까지는 이 stats 블록을 지워두세요. */}
          <div className="stats">
            <div className="stat">
              <div className="num">000+</div>
              <div className="label">누적 수강생</div>
            </div>
            <div className="stat">
              <div className="num">0.0/5</div>
              <div className="label">평균 만족도</div>
            </div>
            <div className="stat">
              <div className="num">00년+</div>
              <div className="label">마케팅 실무</div>
            </div>
            <div className="stat">
              <div className="num">000+</div>
              <div className="label">브랜딩 컨설팅</div>
            </div>
          </div>
        </div>
      </div>

      {/* 왜 빅네임인가 */}
      <section id="why">
        <div className="wrap center">
          <div className="eyebrow">WHY BIGNAME</div>
          <h2>
            좋은 걸 만드는 것과
            <br />
            좋은 걸 알리는 것은 다른 일입니다
          </h2>
          <p className="lead">
            잘하는 사람이 안 팔리는 이유는 대부분 실력이 아니라 전달에 있습니다.
            빅네임은 그 전달을 다룹니다.
          </p>
          <div className="cards">
            <div className="card">
              <div className="idx">01</div>
              <h3>이름부터 정리합니다</h3>
              <p>
                무엇을 하는 사람인지 한 문장으로 설명되지 않으면 아무리 알려도
                남지 않습니다. 정체성과 그 한 문장을 먼저 잡습니다.
              </p>
            </div>
            <div className="card">
              <div className="idx">02</div>
              <h3>팔리는 구조를 만듭니다</h3>
              <p>
                콘텐츠, 채널, 상품이 따로 놀지 않게 연결합니다. 유입이 판매로
                이어지는 경로를 설계합니다.
              </p>
            </div>
            <div className="card">
              <div className="idx">03</div>
              <h3>혼자 굴러가게 남깁니다</h3>
              <p>
                교육이 끝난 뒤에도 쓸 수 있는 기준과 템플릿을 남깁니다. 매번
                다시 물어보지 않아도 되게 합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 상품 */}
      <section id="products" className="alt">
        <div className="wrap center">
          <div className="eyebrow">PRODUCTS</div>
          <h2>
            이름값이 생길 때까지
            <br />
            함께 갑니다
          </h2>
          <p className="lead">지금 필요한 단계부터 시작하세요.</p>
        </div>
        <div className="wrap">
          <div className="products">
            <div className="product">
              <span className="badge">BEST</span>
              <h3>퍼스널 브랜딩 올인원 강의</h3>
              <p className="desc">
                정체성 정의부터 콘텐츠 발행, 상품화까지. 이름이 알려지고 그
                이름으로 파는 과정 전체를 다루는 실전 강의입니다.
              </p>
              <ul>
                <li>한 문장 정체성 설계</li>
                <li>채널별 콘텐츠 운영 기준</li>
                <li>상품 구조와 판매 페이지 설계</li>
              </ul>
              {/* TODO: 확정 가격으로 교체 */}
              <div className="price">
                ₩000,000<small>부가세 포함</small>
              </div>
              {/* TODO: 래피드(Rapid) 결제 링크로 교체 */}
              <a href="#" className="btn btn-fill">
                구매하기 →
              </a>
            </div>

            <div className="product">
              <h3>전자책 · 퍼스널 브랜딩의 정석</h3>
              <p className="desc">
                마케팅을 처음 다루는 사람이 순서대로 따라 할 수 있게 정리한 실무
                가이드. 강의 전에 읽어도 되고, 강의 없이 읽어도 됩니다.
              </p>
              <ul>
                <li>브랜딩 시작 체크리스트</li>
                <li>콘텐츠 소재 발굴 프레임</li>
                <li>바로 쓰는 템플릿 모음</li>
              </ul>
              {/* TODO: 확정 가격으로 교체 */}
              <div className="price">
                ₩00,000<small>부가세 포함</small>
              </div>
              {/* TODO: 래피드(Rapid) 결제 링크로 교체 */}
              <a href="#" className="btn btn-line">
                구매하기 →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 기업 교육 */}
      <section id="corporate">
        <div className="wrap split">
          <div>
            <div className="eyebrow">FOR TEAMS</div>
            <h2>
              우리 팀에
              <br />
              맞춘 교육으로
            </h2>
            <p className="lead">
              마케팅팀, 콘텐츠팀, 브랜드팀을 위한 맞춤 기업 교육. 우리 브랜드의
              실제 상황과 자료로 실습합니다.
            </p>
          </div>
          <div>
            <ul className="checks">
              <li>우리 브랜드 사례로 직접 실습</li>
              <li>담당자가 계속 쓸 수 있는 기준 내재화</li>
              <li>교육 후 바로 실행할 로드맵 전달</li>
            </ul>
            <Link
              href="/apply?type=corporate"
              className="btn btn-fill"
              style={{ marginTop: 28 }}
            >
              강연 문의하기
            </Link>
          </div>
        </div>
      </section>

      {/* 컨설팅 */}
      <section id="consulting" className="alt">
        <div className="wrap split">
          <div>
            <div className="eyebrow">CONSULTING</div>
            <h2>
              극소수를 위한
              <br />
              1:1 브랜딩 컨설팅
            </h2>
            <p className="lead">
              분기당 소수 정원으로 진행합니다. 사전 검토 후 진행 여부를
              결정합니다.
            </p>
          </div>
          <div>
            <ul className="checks">
              <li>현재 브랜드 포지션 진단</li>
              <li>정체성과 메시지 재정의</li>
              <li>콘텐츠·채널 운영 로드맵</li>
              <li>상품 구조와 가격 설계</li>
              <li>월간 리뷰와 전략 조정</li>
            </ul>
            <Link
              href="/apply?type=consulting"
              className="btn btn-fill"
              style={{ marginTop: 28 }}
            >
              컨설팅 신청하기
            </Link>
          </div>
        </div>
      </section>

      {/* 무료 자료 */}
      <section>
        <div className="wrap">
          <div className="magnet">
            <div className="eyebrow">FREE</div>
            <h2>퍼스널 브랜딩 시작 체크리스트</h2>
            <p className="lead">
              무엇부터 정해야 할지 몰라 멈춰 있다면, 순서대로 답해보세요.
            </p>
            {/* TODO: 신청 폼 또는 뉴스레터 링크 연결 */}
            <a href="#" className="btn btn-fill" style={{ marginTop: 28 }}>
              무료로 받기 →
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
