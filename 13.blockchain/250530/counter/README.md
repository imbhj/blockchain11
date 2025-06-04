# 내 요구 사항 흐름

나는 지금부터 Counter를 구현하고 싶습니다

유저 플로우는 다음과 같습니다

## 유저 플로우

```sh
1. 유저가 메인 화면에 접속한다
2. 화면에 [ + ], [ - ], 현재 카운터 값이 표시된다 (GET /counter)
3. [+] 또는 [-] 버튼을 누른다
4. 프론트엔드는 axios로 서버에 요청을 보낸다
5. 서버는 요청을 받아 DB 값을 수정한다 (POST /counter/increment or /decrement)
6. 수정된 값을 다시 DB에서 조회하거나, 응답으로 바로 반환한다
7. 서버는 해당 값을 응답으로 돌려준다
8. 프론트엔드는 상태를 업데이트하고, 화면이 다시 렌더링된다
```

# 필수 기술

프론트: Next.js for 14.2.29 version
백엔드: Node.js
DB: MySQL (함수형)
TypeORM: Sequelize (함수형)

# 디렉토리 구조

백엔드: counter_back
프론트: counter_front

이렇게 구성하여 프로젝트를 완성시켜 주십시오.

