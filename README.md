# 커뮤니티 어플리케이션

## 📌 팀원

- [조예슬](https://github.com/eungang3)
- [육지](https://github.com/azure928)
- [박지은](https://github.com/JJieunn)
- [이윤재](https://github.com/Yunjae53)

<br/>

## 📌 서비스 개요

유저들이 서로 친구를 맺고 글을 올릴 수 있는 커뮤니티 앱

<br/>

## 📌 개발 기간

2022.10.11 ~ 2022.10.14

<br/>

## 📌 요구사항 분석 및 구현

### 유저

**1. 회원가입, 로그인 (이윤재)**

- 유저는 이메일, 비밀번호를 이용하여 회원가입, 로그인을 할 수 있다.

**2. 팔로우, 언팔로우 (조예슬)**

- 유저는 다른 유저의 이메일을 입력하여 친구를 팔로우 할 수 있고, 언팔로우 역시 가능하다.

---

### 포스트

**1. 포스트 C/R/R/U/D (박지은)**

- 유저는 간단한 포스트를 올릴 수 있으며, 해당 글은 작성자만 수정하거나 삭제할 수 있다.

**2. 포스트에 리액션 남기기 (육지)**

- 유저는 다른 사람의 포스트에 리액션을 남기거나 취소할 수 있다. (1:좋아요 2:싫어요 3:보는중)

**3. 포스트에 답변 달기 (육지)**

- 유저는 포스트에 답변을 달 수 있다.

<br/>

## 📌 DB Modeling

**[🔗 dbdiagram](https://dbdiagram.io/d/63450962f0018a1c5fd79252)**
![DB Modeling](https://i.imgur.com/fF4B5af.png)

<br>

## 📌 API DOCS

**[🔗 회원가입, 로그인]()**

**[🔗 팔로우, 언팔로우]()**

**[🔗 포스트 C/R/R/U/D]()**

**[🔗 포스트에 답변, 리액션 남기기](https://documenter.getpostman.com/view/21288917/2s83zpLMDZ)**

<br/>

## 📌 적용 기술

- 사용언어 : TypeScript
- 런타임 환경 : Node.js
- 프레임워크 : Nestjs
- ORM : TypeORM
- 데이터베이스 : MySQL

<br/>

## 📌 Commit Convention

- Init : 프로젝트 초기 세팅
- Add : 새로운 기능 추가
- Update : 원래도 정상적으로 동작하고 있었지만 수정, 추가, 보완 했을 때
- Fix : 올바르지 않은 동작을 고친 경우 (버그 수정)
- Chore : 빌드 업무 수정, 패키지 매니저 수정, 그 외 자잘한 수정에 대한 커밋
- Docs : 문서 작성, 수정
- Refactor : 코드 리팩토링
- Test : 테스트 코드 추가
- Style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우, linting

<br>

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
