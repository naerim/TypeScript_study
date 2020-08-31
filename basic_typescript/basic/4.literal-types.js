/*
    🌙 Literal type
    : 리터럴타입은 집합의 타입보다 더 구체적인 하위 타입이다.
      예로 "hello"는 string이지만 string은 "hello"가 아니다.
      타입스크립트에는 문자열과 숫자 두 가지의 리터럴 타입이있는데 이를 사용하면 더 정확한 값을 지정할 수 있다.


    🌙 Literal Narrowing
    var 또는 let 은 변수의 값이 변경될 가능성이 있다.
    하지만 const로 변수를 선언하면 이 객체는 절대변경되지 않는다.

    // const를 사용하여 변수 helloWorld가 절대 변경되지 않음을 보장한다.
    // 따라서, TypeScript는 문자열이 아닌 "Hello World"로 타입을 정한다.
    const helloWorld = "Hello World";

    // 반면, let은 변경될 수 있으므로 컴파일러는 문자열이라고 선언할 것이다.
    let hiWorld = "Hi World";

    무한한 수의 잠재적 케이스들을 유한한 수의 잠재적 케이스로 줄여나가는 것을 narrowing이라 한다.


   🌙 String Literal Types
    : 문자열 리터럴 타입은 유니언 타입, 타입 가드, 타입 별칭과 잘 결합된다.
      이런 기능을 함께 사용하여 문자열로 enum과 비슷한 형태를 갖출 수 있다.

    // @errors: 2345
    type Easing = "ease-in" | "ease-out" | "ease-in-out";

    class UIElement {
      animate(dx: number, dy: number, easing: Easing) {
        if (easing === "ease-in") {
          // ...
        } else if (easing === "ease-out") {
        } else if (easing === "ease-in-out") {
        } else {
          // 하지만 누군가가 타입을 무시하게 된다면
          // 이곳에 도달하게 될 수 있습니다.
        }
      }
    }

    let button = new UIElement();
    button.animate(0, 0, "ease-in");
    button.animate(0, 0, "uneasy");

    허용된 세 개의 문자열이 아닌 다른 문자열을 사용하게 되면 오류가 발생한다.

    '"uneasy"' 타입은 '"ease-in" | "ease-out" | "ease-in-out"' 타입의 매개 변수에 할당할 수 없습니다.

    문자열 리터럴 타입은 오버로드를 구별하는 것돠 동일한 방법으로 사용될 수 있다.

    function createElement(tagName: "img"): HTMLImageElement;
    function createElement(tagName: "input"): HTMLInputElement;
    // ... 추가적인 중복 정의들 ...
    function createElement(tagName: string): Element {
      // ... 여기에 로직 추가 ...
    }


    🌙 Numeric Literal Types
    : 숫자형 리터럴 타입은 주로 설정값을 설명할 때 사용한다.

    // loc/lat 좌표에 지도를 생성한다.
    declare function setupMap(config: MapConfig): void;
    // ---생략---
    interface MapConfig {
        lng: number;
        lat: number;
        tileSize: 8 | 16 | 32;
    }

    setupMap({ lng: -73.935242, lat: 40.73061, tileSize: 16 });
*/
