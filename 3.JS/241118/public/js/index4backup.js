// 함수를 선언하였다.
// 매개변수 : 호출했을 때, 넘겨준 데이터를 받음.(이름은 자유롭게 작성 가능)
// => 단, 알아볼 수 있게끔 작성하는 것이 중요.
function showMessage1(name) {
    // 반복되는 코드를 묶어놓고, 필요할때마다 재사용할 수 있도록 만든 코드 블록.
    // console.log(name + "좋은 아침입니다. 안녕하세요!")
    // console.log(`${name} 좋은 아침입니다. 안녕하세요!`)
    // return : 함수의 최종적인 반환값을 명시. 예약어임.
    // return `${name} 좋은 아침입니다. 안녕하세요`;
    `${name} 좋은 아침입니다. 안녕하세요`;
}

// 함수를 호출하였다. => 인사를 해야하니까!
// 인자 => ("태정 님"): 매개변수에 넘겨줄 데이터
showMessage1("혜림 님");
showMessage1("채원 님");
showMessage1("상아 님");
showMessage1("유정 님");
showMessage1("혜성 님");
showMessage1("도화 님");

// 함수를 호출하지 않고, 변수에 할당하였다. => 함수를 부르지 않고 일단 변수에 담아놨다.
// let show = showMessage1;

// 태정님이 오전 11시에 오셨습니다. 인사해야겠죠?
let result = showMessage1("태정 님");
console.log(result)

// 여기서 알 수 있는건 선언된 함수를 호출(부를려면)하려면 ()가 필요함.

/*
    1. 매개변수의 데이터 타입, 데이터 값을 알아야 함.
    2. 함수를 변수에 담아서 사용하려면, return값의 데이터 타입, 값을 알아야 함.
*/
