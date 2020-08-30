/*
    🌙 Function
    : 자바스크립트 함수와 마친가지로 기명함수와 익명함수로만들 수 있다.
    // 기명 함수
    function add(x, y) {
      return x + y;
    }

    // 익명 함수
    let myAdd = function(x, y) { return x + y };


    🌙 함수의 타이핑
    function add(x: number, y: number): number {
        return x + y;
    }

    let myAdd = function(x: number, y: number): number { return x + y };

    각 파라이터와 함수 자신의 반환될 타입을 정해줄 수 있다.
    타입스크립트는 반환문을 보고 반환 타입을 파악할 수 있으므로 반환 타입을 생략할 수 있다.


    🌙 함수 타입 작성하기
    let myAdd: (x: number, y: number) => number =
        function(x: number, y: number): number { return x + y; };

    함수의 타입은 매개변수의 타입과 반환타입이 있다. 위의 코드대신 이렇게 쓸 수도 있다.

    let myAdd: (baseValue: number, increment: number) => number =
        function(x: number, y: number): number { return x + y; };

    만약 함수가 값을 반환하지 않는다면 void를 써서 표시한다.


    🌙 선택적 매개변수와 기본 매개변수
    : 함수에 주어진 인자의 수는 함수가 기대하는 매개변수의 수와 일치해야 한다.

    function buildName(firstName: string, lastName: string) {
        return firstName + " " + lastName;
    }

    let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
    let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    let result3 = buildName("Bob", "Adams");         // 정확함

    타입스크립트에서 선택적 매개변수를 원한다면 매개변수 이름 끝에 ?를 붙이면 된다.

    function buildName(firstName: string, lastName?: string) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }

    let result1 = buildName("Bob");                  // 지금은 바르게 동작
    let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    let result3 = buildName("Bob", "Adams");         // 정확함

    타입스크립트에서는 유저가 값을 제공하지 않거나 undefined로 했을 때 할당될 매개변수의 값을 정해놓을 수 있다.

    function buildName(firstName: string, lastName = "Smith") {
        return firstName + " " + lastName;
    }

    let result1 = buildName("Bob");                  // 올바르게 동작, "Bob Smith" 반환
    let result2 = buildName("Bob", undefined);       // 여전히 동작, 역시 "Bob Smith" 반환
    let result3 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    let result4 = buildName("Bob", "Adams");         // 정확함

    만약 미리 할당된 매개변수가 필수 매개변수보다 앞에 오게 된다면 사용자가 명시적으로 undefined를 전달해 주어야 한다.

    function buildName(firstName = "Will", lastName: string) {
        return firstName + " " + lastName;
    }

    let result1 = buildName("Bob");                  // 오류, 너무 적은 매개변수
    let result2 = buildName("Bob", "Adams", "Sr.");  // 오류, 너무 많은 매개변수
    let result3 = buildName("Bob", "Adams");         // 성공, "Bob Adams" 반환
    let result4 = buildName(undefined, "Adams");     // 성공, "Will Adams" 반환


    🌙 나머지 매개변수
    function buildName(firstName: string, ...restOfName: string[]) {
        return firstName + " " + restOfName.join(" ");
    }

    // employeeName 은 "Joseph Samuel Lucas MacKinzie" 가 될 것 이다.
    let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");

    생략 부호는 나머지 매개변수가 있는 함수의 타입에도 사용된다.

    function buildName(firstName: string, ...restOfName: string[]) {
        return firstName + " " + restOfName.join(" ");
    }

    let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
 */