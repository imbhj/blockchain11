## **과제 1: DOM 조작 실습**  

과제마다 index.js와 index.html을 각각 만들어주세요

ex=> 4문제 있으면 index1.js, index2.js, index3.js, index4.js
=> HTML 파일도 동일하게 생성하세요.

### **문제 1-1: `getElementsByTagName`와 반복문**
1. HTML 문서에 li태그를 5개를 "직접" 생성하세요
2. HTML 문서에서 모든 `<li>` 태그를 가져와 각 항목에 **"항목 x"**(x는 숫자) 형식으로 자바스크립트 document객체를 활용하여 내용을 변경하여 주입하세요.
3. 예를 들어, `<li>`가 5개라면 결과는 아래와 같이 변경되어야 합니다.
   ```
   항목 1
   항목 2
   항목 3
   항목 4
   항목 5
   ```

### **문제 1-2: `innerHTML`과 스타일 조작**
1. HTML 문서에 `<div class="box"></div>` 태그를 추가하고, JavaScript를 이용해 이 박스 안에 다음 내용을 삽입하세요.
   ```html
   <h2>실습 과제</h2>
   <p>DOM 조작 연습 중입니다.</p>
   ```
2. 그리고 해당 박스의 배경색을 파란색, 글자 색을 흰색으로 설정하세요.

## **과제 2: 배열과 객체 활용**  

### **문제 2-1: 평균 점수 계산**
1. 아래의 객체를 활용하여 평균 점수를 계산하고, 결과를 **"학생의 평균 점수는 xx점입니다."**를 태그 컨텐츠 안에 주입하세요.

```html
    <h2 id="avgGrade"></h2>
```

   ```javascript
   const student = {
       name: "홍길동",
       grades: [80, 90, 70, 85, 95]
   };
   ```

## **과제 3: DOM 조작과 반복문 활용**  

### **문제 3-1: `getElementsByClassName` 활용**

```html
    <div class="content"></div>
    <div class="content"></div>
    <div class="content"></div>
```
1. 위의 태그의 class 이름을 모두 선택하여 각 박스에 **"박스 x"**(x는 숫자) 형식으로 내용을 삽입하세요.
(반복문 활용)
   - 첫 번째 박스: "박스 1"
   - 두 번째 박스: "박스 2"
   - 세 번째 박스: "박스 3"

## **과제 4: 심화 과제**

### **문제 4-1: HTML 생성 및 DOM 조작**
1. !로 HTML 문서를 만듭니다.
2. JavaScript만을 이용하여 동적으로 다음 HTML 구조를 생성하세요.
   ```html
   <div class="student">
       <h3>이름: 홍길동</h3>
       <p>평균 점수: 85</p>
   </div>
   ```
3. 그리고 `<body>`에 추가하세요.

## **과제 제출 방법**
1. 구글 드라이브에 결과물에 20241122_주말과제_결과물 폴더 만들었습니다.
2. 파일 이름은 `이름_주말과제` 폴더 형식으로 저장해주세요.
3. 마감일: **다음 주 월요일(2024-11-25) 수업 시작전까지**  

**`console.log()`로 중간 결과를 출력**해 값을 자주 확인하세요!!