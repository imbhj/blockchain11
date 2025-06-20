## **IPXHOP MVE 설문 시스템 – 킥오프 발표 대본 구조 (10분)**

---

### **[0:00 ~ 0:30] 인사 및 목차 소개**

안녕하세요. IPXHOP MVE 설문 시스템 팀입니다.  
저희는 블록체인 기반으로 감성 중심 음원의 가치를 평가하고 NFT로 기록하는 설문 플랫폼을 개발하고자 합니다.

오늘 발표는 다음과 같은 순서로 진행하겠습니다.

1. 개발 컨셉
2. 개발 일정
3. 기술 스택
4. 팀원 소개
5. 기업에 드리고 싶은 질문

✅ _목표: 주제 인지 + 발표 흐름 안내_

---

### **[0:30 ~ 2:00] 1. 개발 컨셉 설명**

먼저 개발 컨셉에 대해 설명드리겠습니다.

IPXHOP MVE 설문 시스템은 대중이 음원의 작품성과 대중성을 평가하는 서베이 시스템입니다.
설문 참여자는 리워드를 받으며, 그 결과는 NFT로 발행됩니다.

즉, 저희는 음원 데이터를 블록체인 위에 기록함으로써 음원의 ‘대중적 가치’를 디지털 자산으로 전환하고자 합니다.

이런 구조를 통해 창작자, 소비자, 플랫폼이 모두 참여하는 Web3 생태계를 만들고자 합니다.

저희의 핵심 목표는 다음과 같습니다:

- 누구나 쉽게 설문 생성 및 참여가 가능한 사용자 친화적 UX
- 설문 결과를 NFT로 시각화하여 디지털 자산화
- 리워드 및 출금은 스마트 컨트랙트 기반으로 투명하게 처리
- 성실한 참여자에게 Soulbound Token(SBT) 발급으로 신뢰도 기반 등급화

✅ _목표: 프로젝트의 ‘철학 + 문제 해결 구조’ 강조_

---

### **[2:00 ~ 4:00] 2. 개발 일정 소개**

다음은 개발 일정입니다.

저희 프로젝트는 총 6주간 진행되며, 아래와 같이 주차별 작업을 계획하고 있습니다.

- 1주차 (6/9~13): 프레임워크 셋업, ERD 설계
- 2~3주차 (6/16~27): 설문 생성 기능, 마이페이지, NFT 등록
- 1차 중간 보고 (6/29): 중간 보고
- 4~5주차 (6/30~7/11): 스마트 컨트랙트 연동, 리워드 로직, 출금 처리
- 6주차 (7/14~18): 테스트 및 최종 발표 자료 준비

중간 보고는 6월 29일, 2차 보고는 7월 4일 또는 11일 예정이며, 최종 발표는 7월 14일 또는 18일입니다.

저희는 이 일정을 기준으로 주요 마일스톤마다 기능을 분할 개발하고, 점진적 통합과 테스트를 반복할 예정입니다.

✅ _목표: 현실적인 일정 설계 능력 전달 + 팀의 실행 전략 부각_

---

### **[4:00 ~ 6:00] 3. 기술 스택 설명**

다음은 기술 스택입니다.

프론트엔드는 Next.js 기반으로 구성하였고, TypeScript와 Tailwind CSS, Zustand를 사용합니다.
요청 처리는 Axios를 통해 서버와 통신합니다.

백엔드는 Node.js + TypeScript, MySQL을 사용하며, 인증은 OAuth 2.0 기반의 소셜 로그인과 JWT를 활용할 계획입니다.
ORM은 Prisma를 우선적으로 고려하고 있습니다.

블록체인 파트는 Solidity 스마트 컨트랙트를 Kaia 네트워크에 배포할 예정입니다.
지갑은 MetaMask로 연동하며, NFT 메타데이터 및 이미지 저장은 IPFS를 사용할 예정입니다.

SBT는 ERC-1155 기반으로 구현하고, 비양도성 로직을 통해 신뢰 기반의 토큰화를 구현할 계획입니다.

✅ _목표: 기술 선택의 근거를 간결하게 설명_

---

### **[6:00 ~ 7:30] 4. 팀원 소개**

다음은 저희 팀원 소개입니다.

- 김태정 (팀장 / 블록체인): 스마트 컨트랙트 개발과 리워드 처리 전반을 담당합니다.
- 고혜성 (프론트엔드): 유저용 반응형 웹 화면을 담당합니다.
- 은유정 (백엔드): DB 설계와 RESTful API를 담당합니다.
- 조상아 (프론트엔드): 관리자 페이지와 대시보드를 개발합니다.

각자 전공과 관심 기술에 따라 역할을 분담했으며, 팀 내 협업 경험도 충분히 축적하고 있습니다.

✅ _목표: 팀 구성이 유기적이고 역할이 명확함을 보여줌_

---

### **[7:30 ~ 9:30] 5. 기업 대상 질문 정리**

마지막으로 기업 측에 드리고 싶은 질문입니다.

이번 프로젝트는 저희가 설계했지만, 실제 현업 관점의 피드백이 매우 중요하다고 생각합니다.
그래서 주요 항목별로 아래와 같은 질문을 준비했습니다:

- **리워드 지급 기준**: 성실한 참여를 어떻게 정의할 수 있을까요?
- **SBT 발급 방식**: 자동/수동 중 어떤 방식을 선호하시나요?
- **출금 로직**: 최소 출금 수량 기준이 필요할까요?
- **음원 샘플**: 외부 API 연동 (Spotify 등) 사용 가능할까요?
- **관리자 권한 구분**: 전체 관리자와 설문 생성자의 권한 분리 필요 여부
- **추후 계획**: 로컬 LLM을 통한 응답 요약/추천 기능은 도입 가능할까요?

이외에도 설문 구성, 결과 공개 방식, 설문 참여율 확보 전략 등
현업 입장에서 조언 주시면 적극 반영하겠습니다.

✅ _목표: 일방적 발표가 아니라 **쌍방 피드백을 요청하는 구조** 강조_

---

### **[9:30 ~ 10:00] 마무리 인사**

이상으로 저희 IPXHOP MVE 설문 시스템 팀의 발표를 마치겠습니다.

오늘 피드백 주신 내용은 앞으로 개발 진행에 적극 반영하겠습니다.

감사합니다.
