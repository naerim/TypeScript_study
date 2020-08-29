/*
    🌙 interface
    : 인터페이스는 타입들의 이름을 짓는 역할을 하고 코드 안의 계약을 정의한다.


    🌙 첫 번째 인터페이스
    interface LabeledValue {
        label: string;
    }

    function printLabel(labeledObj: LabeledValue) {
        console.log(labeledObj.label);
    }

    let myObj = {size: 10, label: "Size 10 Object"};
    printLabel(myObj);
    타입 검사는 프로퍼티들의 순서를 요구하지 않는다.


    🌙 선택적 프로퍼티 - Optional Properties
    : 인터페이스의 property 가 필요한 것은 아니다. 어떤 조건에서만 존재하거나 아예 없을 수도 있다.
      선택적 프로퍼티는 선언에서 프로퍼티 이름 끝에 ?를 붙여 표시한다.
      선택적 프로퍼티의 이점은 인터페이스에 속하지 않는 프로퍼티의 사용을 방지하면서, 사용 가능한 속성을 기술하는 것이다.

    interface SquareConfig {
        color?: string;
        width?: number;
    }

    function createSquare(config: SquareConfig): {color: string; area: number} {
        let newSquare = {color: "white", area: 100};
        if (config.color) {
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width * config.width;
        }
        return newSquare;
    }

    let mySquare = createSquare({color: "black"});


    🌙 읽기전용 프로퍼티 - Readonly properties
    : 일부 프로퍼티들은 객체가 처음 생성될 때만 수정 가능해야한다. 프로퍼티 이름 앞에 readonly 를 넣어서 이를 지정할 수 있다.

    interface Point {
        readonly x: number;
        readonly y: number;
    }

    객체 리터럴을 할당하여 Point 를 생성한다다. 할 후에는 x, y를 수정할 수 없다.

    let p1: Point = { x: 10, y: 20 };
    p1.x = 5; // 오류!

    타입스크립트에서는 모든 변경 메서드가 제거된 ReadonlyArray<T> 타입이 있다.
    그래서 생성 후에 배열을 변경하지 않음을 보장할 수 있다.

    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    ro[0] = 12; // 오류!
    ro.push(5); // 오류!
    ro.length = 100; // 오류!
    a = ro; // 오류!

    ReadonlyArray 를 일반 배열에 재할당이 불가능하지만, 타입 단언(type assertion)으로 오버라이드하는 것은 가능하다.

    a = ro as number[];


    🌙 초과 프로퍼티 검사
    : 객체 리터럴은 다른 변수에 할당할 때나 인수로 전달할 때, 특별한 처리를 받고, 초과 프로퍼티 검사 (excess property checking)를 받는다.
      만약 객체 리터럴이 "대상 타입 (target type)"이 갖고 있지 않은 프로퍼티를 갖고 있으면, 에러가 발생한다.

    interface SquareConfig {
        color?: string;
        width?: number;
    }

    function createSquare(config: SquareConfig): { color: string; area: number } {
        // ...
    }

    let mySquare = createSquare({ colour: "red", width: 100 });

    위의 코드 마지막 줄에 에러가 발생한다. 이 검사를 피하기 위한 가장 간단한 방법은 타입 단언을 사용하는 것이다.

    let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);

    하지만 특별한 경우에 추가 프로퍼티가 있음을 확신한다면, 문자열 인덱스 서명을 추가하는 것이 더 나은 방법이다.
    만약 SquareConfig color 와 width 프로퍼티를 위와 같은 타입으로 갖고 있고, 또한 다른 프로퍼티를 가질 수 있다면, 다음과 같이 정의할 수 있다.

    interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any;
    }


    🌙 함수 타입
    : 인터페이스로 함수 타입을 기술하기 위해, 인터페이스에 호출 서명 (call signature)를 전달한다.
      이는 매개변수 목록과 반환 타입만 주어진 함수 선언과 비슷하며 각 매개변수는 이름과 타입이 모두 필요하다.

    interface SearchFunc {
        (source: string, subString: string): boolean;
    }

    한번 정의되면, 함수 타입 인터페이스는 다른 인터페이스처럼 사용할 수 있다.

    let mySearch: SearchFunc;
    mySearch = function(source: string, subString: string) {
        let result = source.search(subString);
        return result > -1;
    }

    매개변수의 이름이 같을 필요는 없다.

    let mySearch: SearchFunc;
    mySearch = function(src: string, sub: string): boolean {
        let result = src.search(sub);
        return result > -1;
    }

    만약 타입을 전혀 지정하지 않고 싶다면, SearchFunc 타입의 변수로 직접 함수 값이 할당되었기 때문에 인수 타입을 추론할 수 있다.

    let mySearch: SearchFunc;
    mySearch = function(src, sub) {
        let result = src.search(sub);
        return result > -1;
    }


    🌙 인덱서블 타입 - Indexable Types
    : 타입스크립트에서는 타입을 인덱스로 기술할 수 있다.

    interface StringArray {
        [index: number]: string;
    }

    let myArray: StringArray;
    myArray = ["Bob", "Fred"];

    let myStr: string = myArray[0];

    StringArray 는 인덱스 서명이 있는 인터페이스이다. 이 인덱스 서명은 StringArray 가 number 로 indexed 되면 string 을 반환한다.
    인덱스 서명을 지원하는 타입에는 문자열과 숫자 두 가지가 있다.
    두 타입의 인덱서를 모두 지원하는 것은 가능하지만, number 인덱서에서 반환된 타입은
    반드시 string 인덱서에서 반환된 타입의 하위 타입이어야 한다.

    class Animal {
        name: string;
    }
    class Dog extends Animal {
        breed: string;
    }
    // 오류: 숫자형 문자열로 인덱싱을 하면 완전히 다른 타입의 Animal을 얻게 될 것이다.
    interface NotOkay {
        [x: number]: Animal;
        [x: string]: Dog;
    }

    문자열 인덱스 시그니처는 모든 프로퍼티들이 반환 타입과 일치하도록 강제한다.

    interface NumberDictionary {
        [index: string]: number;
        length: number;    // 성공, length는 숫자입니다
        name: string;      // 오류, `name`의 타입은 인덱서의 하위타입이 아닙니다
    }

    하지만, 인덱스 시그니처가 프로퍼티 타입들의 합집합이라면 다른 타입의 프로퍼티들도 허용할 수 있다.

    interface NumberOrStringDictionary {
        [index: string]: number | string;
        length: number;    // 성공, length는 숫자입니다
        name: string;      // 성공, name은 문자열입니다
    }

    인덱스의 할당을 막기 위해 인덱스 시그니처를 읽기 전용으로 만들 수 있다.

    interface ReadonlyStringArray {
        readonly [index: number]: string;
    }
    let myArray: ReadonlyStringArray = ["Alice", "Bob"];
    myArray[2] = "Mallory"; // 오류!


    🌙 클래스 타입

    // 인터페이스 구현하기

    클래스에 구현된 메서드를 인터페이스 안에서도 기술할 수 있다.

    interface ClockInterface {
        currentTime: Date;
        setTime(d: Date): void;
    }

    class Clock implements ClockInterface {
        currentTime: Date = new Date();
        setTime(d: Date) {
            this.currentTime = d;
        }
        constructor(h: number, m: number) { }
    }

    // 인터페이스 확장하기
    : 인터페이스는 여러 인터페이스를 확장할 수 있어, 모든 인터페이스의 조합을 만들어낼 수 있다.

    interface Shape {
        color: string;
    }

    interface PenStroke {
        penWidth: number;
    }

    interface Square extends Shape, PenStroke {
        sideLength: number;
    }

    let square = {} as Square;
    square.color = "blue";
    square.sideLength = 10;
    square.penWidth = 5.0;

    // 하이브리드 타입
    : 추가적인 프로퍼티와 함께 함수와 클래스 역할 모두를 수행하는 클래스가 그 예이다.
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }

    function getCounter(): Counter {
        let counter = (function (start: number) { }) as Counter;
        counter.interval = 123;
        counter.reset = function () { };
        return counter;
    }

    let c = getCounter();
    c(10);
    c.reset();
    c.interval = 5.0;

    // 클래스를 확장한 인터페이스
    : 인터페이스 타입이 클래스 타입을 확장하면, 클래스의 멤버는 상속받지만 구현은 상속받지 않는다.
      인터페이스는 private 혹은 protected 멤버를 포함한 클래스를 확장할 수 있고 이 타입은 그 클래스나 하위클래스에 의해서만 구현될 수 있다.

      class Control {
        private state: any;
    }

    interface SelectableControl extends Control {
        select(): void;
    }

    class Button extends Control implements SelectableControl {
        select() { }
    }

    class TextBox extends Control {
        select() { }
    }

    // Error: Property 'state' is missing in type 'Image'.
    class Image implements SelectableControl {
        private state: any;
        select() { }
    }
*/
