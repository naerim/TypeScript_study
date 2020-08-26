/*
    🌙 Boolean
    let usDone: boolean = false;


    🌙 Number
    let decimal: number = 6;
    let hex: number: 0xf00d;
    let binary: number = 0b1010;
    let octal: number = 0o744;


    🌙 String
    let color: string = "blue";
    let fullName: string = `Bob`;
    let age: number = 37;
    let sentence: string = `Hello, my name is ${ fullName }. I'll be ${ age + 1 } years old next month.`;


    🌙 Array
    let list: number[] = [1,2,3];
    let list: Array<number> = [1,2,3];


    🌙 Tuple
    : 투플 타입을 사용하면 요소의 타입과 갯가 고정된 배열을 표현할 수 있다.
      단, 요소들의 타입이 모두 같을 필요는 없다.
    ex) let x: [string, number];
        x = ["hello", 10];
        console.log(x[0].substring(1));


    🌙 Enum
    : enum 은 값의 집합에 더 나은 이름을 붙여줄 수 있다.
    ex) enum Color {Red, Green, Blue}
        let c: Color = Color.Green;

    기본적으로 enum 은 0부터 시작하여 멤버들의 번호를 매긴다.
    멤버 중 하나의 값을 수동으로 설정하여 번호를 바꿀 수 있다.
    ex) enum Color {Red = 1, Green, Blue}
        let c: Color = Color.Green;

    또한 모든 값을 수동으로 설정할 수 있다.
    ex) enum Color {Red = 1, Green = 2, Blue = 4}
        let c: Color = Color.Green;

    매겨진 값을 사용해 enum 멤버의 이름을 알아낼 수 있다.
    ex) enum Color {Red = 1, Green, Blue}
        let colorName: string = Color[2];
        console.log(colorName); // 값이 2인 'Green'이 출력된다.


    🌙 Any
    let notSure: any = 4;

    any 타입은 타입의 일부만 알고 전체는 알지 못할 때 유용하다.
    예를 들어, 여러 다른 타입이 섞인 배열을 다룰 수 있다.
    ex) let list: any[] = [1, true, "free"];
        list[1] = 100;


    🌙 Void
    void 는 어떤 타입도 존재할 수 없음을 나타내기 때문에, any 의 반대 타입이다.
    보통 함수에서 반환 값이 없을 때 반환 타입을 표현하기 위해 쓰인다.
    ex) function warnUser(): void {
            console.log("This is my warning message");
        }

    void 를 타입 변수를 선언하는 것은 유용하지 않은데,
    왜냐하면 그 변수에는 null 또는 undefined 만 할당할 수 있기 때문입니다.
    ex) let unusable: void = undefined;
        unusable = null; // 성공  `--strictNullChecks` 을 사용하지 않을때만


    🌙 Null and Undefined
    let u: undefined = undefined;
    let n: null = null; // 이 밖에 이 변수들에 할당할 수 있는 값이 없다.

    기본적으로 null 과 undefined 는 다른 모든 타입의 하위 타입이다.
    이것은 null 과 undefined 를 number 같은 타입에 할당할 수 있다는 것을 의미한다.

    하지만, --strictNullChecks 를 사용하면, null 과 undefined 는 오직 any 와 각자 자신들 타입에만 할당 가능하다. (예외적으로 undefined 는 void 에 할당 가능합니다)
    이것은 많은 일반적인 에러를 방지하는 데 도움을 준다.
    이 경우, string 또는 null 또는 undefined 를 허용하고 싶은 경우 유니언 타입인 string | null | undefined 를 사용할 수 있다.


    🌙 Never
    : 절대 발생할 수 없는 타입
    예를 들어, never 는 함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환 타입으로 쓰인다.
    변수 또한 타입 가드에 의해 아무 타입도 얻지 못하게 좁혀지면 never 타입을 얻게 될 수 있다.

    never 타입은 모든 타입에 할당 가능한 하위 타입이다.
    하지만 어떤 타입도 never 에 할당할 수 있거나, 하위 타입이 아니다.(never 자신은 제외) 심지어 any 도 never 에 할당할 수 없다.

    ex) never 를 반환하는 예제
    // never 를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
    function error(message: string): never {
        throw new Error(message);
    }

    // 반환 타입이 never 로 추론된다.
    function fail() {
        return error("Something failed");
    }

    // never 를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
    function infiniteLoop(): never {
        while (true) {
        }
    }


    🌙 Object
    : 원시 타입이 아닌 타입.
    ex) declare function create(o: object | null): void;

        create({ prop: 0 }); // 성공
        create(null); // 성공

        create(42); // 오류
        create("string"); // 오류
        create(false); // 오류
        create(undefined); // 오류


    🌙 Type assertions
    : 타입 단언(Type assertions) 은 컴파일러에게 "날 믿어, 난 내가 뭘 하고 있는지 알아"라고 말해주는 방법.
    타입 단언은 다른 언어의 타입 변환(형 변환)과 유사하지만, 다른 특별한 검사를 하거나 데이터를 재구성하지는 않는다.
    이는 런타임에 영향을 미치지 않으며, 온전히 컴파일러만 이를 사용한다.

    타입 단언에는 두 가지 형태가 있는데,
    1)  "angle-bracket" 문법
        let someValue: any = "this is a string";
        let strLength: number = (<string>someValue).length;

    2) as - 문법
        let someValue: any = "this is a string";
        let strLength: number = (someValue as string).length;

    typeScript 를 JSX 와 함께 사용할 때는, as-스타일의 단언만 허용된다.
*/
